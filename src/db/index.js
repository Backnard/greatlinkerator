const { Client } = require("pg");
const chalk = require("chalk");

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/linkerator";
const db = new Client(connectionString);

//create link
async function createLink({ url, comment, date = null, tags = [] }) {
  try {
    const {
      rows: [newLink],
    } = await db.query(
      `
    INSERT INTO links("url", "comments", "share_date")
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
      [url, comment, date]
    );

    const { id } = newLink;

    if (tags.length) {
      const insertedTags = await createTags(tags);
      console.log("db createlink addtagstolink tags:", tags);
      await addTagsToLink(id, insertedTags);
    }
    return newLink;
  } catch (error) {
    throw error;
  }
}

async function createQueryStrings(fields) {
  const setString = Object.keys(fields)
    .map((key, index) => {
      return `"${key}"=$${index + 1}`;
    })
    .join(",");

  const queryString = Object.values(fields);

  return { setString, queryString };
}

async function updateLink(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const { setString, queryString } = await createQueryStrings(fields);


  try {
    if (setString.length > 0) {
      await db.query(
        `
          UPDATE links
          SET ${setString}
          WHERE id = ${linkId}
          RETURNING *;
          `,
        queryString
      );
    }

    if (tags === undefined) {
      return await getLinkById(linkId);
    }

      console.log("attempting to update tags: ", tags);

      const tagList = await createTags(tags);
      const tagListIdString = tagList.map((tag) => `${tag.id}`).join(", ");
      console.log("Successfully updated tags:", tagList, 'tag ID string', tagListIdString);


      await db.query(`
      DELETE FROM links_tags
      WHERE tags_id
      NOT IN (${tagListIdString})
      AND "links_id"=$1;
      `, [linkId]);

      await addTagsToLink(linkId, tagList);

      return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await db.query(
      `
      INSERT INTO tags(name)
      VALUES (${insertValues})
      ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );

    const { rows } = await db.query(
      `
      SELECT * FROM tags
      WHERE name
      IN (${selectValues});
    `,
      tagList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLinkTags(linkId, tagId) {
  try {
    const { rows: tags } = await db.query(
      `
        INSERT INTO links_tags("tags_id", "links_id")
        VALUES($1, $2)
        ON CONFLICT(tags_id, links_id) DO NOTHING
        RETURNING *;
        `,
      [tagId, linkId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tags) {
  try {
    const tagLinkPromises = tags.map((tag) => {
      return createLinkTags(linkId, tag.id);
    });

    await Promise.all(tagLinkPromises);

    return await getLinkById(linkId);
  } catch (error) {}
}

async function updateClickCount(linkId) {
  try {
    const { rows: link } = await db.query(
      `
        UPDATE links
        SET clicks = clicks + 1
        WHERE id = $1;
        `,
      [linkId]
    );
  } catch (error) {}
}

async function getLinkById(linkId) {
  const {
    rows: [links],
  } = await db.query(
    `
        SELECT * FROM links
        WHERE id=$1;
    `,
    [linkId]
  );

  if (!links) {
    throw {
      message: "No links with that id",
      error: "NoLinkIdError",
    };
  }

  const { rows: tags } = await db.query(
    `
    SELECT tags.* FROM tags
    JOIN links_tags ON tags.id = links_tags.tags_id
    WHERE links_tags.links_id = $1;
    `,
    [linkId]
  );

  links.tags = tags;

  return links;
}

async function getAllLinks() {
  try {
    const { rows: linksIds } = await db.query(`
            SELECT id FROM links
            ORDER BY url ASC;
        `);
    const links = await Promise.all(
      linksIds.map((link) => getLinkById(link.id))
    );

    return links;
  } catch (error) {
    throw error;
  }
}

async function deleteLink(linkId) {
  try {
    const { rows: linkTags } = await db.query(`
        DELETE FROM links_tags
        WHERE links_id = ${linkId}
        RETURNING *;
        `);

    const {
      rows: [link],
    } = await db.query(`
        DELETE FROM links
        WHERE id=${linkId}
        RETURNING *;
        `);

    return link;
  } catch (error) {
    throw error;
  }
}
async function getLinkByUrl(url) {
  try {
    const { rows } = await db.query(`
    SELECT *
    FROM links
    WHERE url LIKE '%${url}%';
    `);

    return rows;
  } catch (e) {
    throw e;
  }
}

async function getLinkByTag(tag) {
  try {
    const {
      rows: [link],
    } = await db.query(`
        SELECT * FROM links
        JOIN links_tags
        ON links.id = links_tags.links_id
        JOIN tags ON links_tags.tags_id = tags.id
        WHERE tags.name LIKE '%${tag}%';
        `);

    return link;
  } catch (error) {
    throw error;
  }
}

async function searchAllLinks(searchTerm) {
  try {
    let searchResults = [];
    const promiseArray = [getLinkByTag(searchTerm), getLinkByUrl(searchTerm)];
    const results = await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  db,
  createLink,
  updateLink,
  createTags,
  createLinkTags,
  addTagsToLink,
  getAllLinks,
  deleteLink,
  getLinkByUrl,
  getLinkByTag,
  searchAllLinks,
  getLinkById,
  updateClickCount,
};
