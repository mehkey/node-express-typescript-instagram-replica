
--DROP TABLE IF EXISTS users, followers, content, feeddata, comments, likes;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  description TEXT,
  following INTEGER,
  followers INTEGER,
  postsCount INTEGER,
  createddate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS followers (
  userid INTEGER REFERENCES users(id),
  followerid INTEGER REFERENCES users(id),
  PRIMARY KEY (userid, followerid)
);

CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  userid INTEGER REFERENCES users(id),
  createddate TIMESTAMP NOT NULL NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feeddata (
  userid INTEGER REFERENCES users(id),
  ListOfContentId TEXT  --REFERENCES content(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  contentid INTEGER REFERENCES content(id),
  userid INTEGER REFERENCES users(id),
  commenttext TEXT NOT NULL,
  datetime TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  contentid INTEGER REFERENCES content(id),
  userid INTEGER REFERENCES users(id),
  datetime TIMESTAMP NOT NULL
);
