PRAGMA foreign_keys = ON;

-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT
);
-- Table: leaderboard
CREATE TABLE leaderboard (
    id UUID PRIMARY KEY,
    user_id_fk UUID NOT NULL,
    user_name_fk TEXT NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (user_id_fk) REFERENCES users(id) ON DELETE CASCADE
);


-- Table: date_register
CREATE TABLE date_register (
    id UUID PRIMARY KEY,
    fk_user UUID NOT NULL,
    date_string TEXT NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: habits
CREATE TABLE habits (
    name TEXT PRIMARY KEY,
    value INTEGER NOT NULL
);

-- Table: date_register_habits
CREATE TABLE date_register_habits (
    id UUID PRIMARY KEY,
    date_register_id_fk UUID NOT NULL,
    habits_fk TEXT NOT NULL,
    didIt BOOLEAN NOT NULL,
    FOREIGN KEY (date_register_id_fk) REFERENCES date_register(id) ON DELETE CASCADE,
    FOREIGN KEY (habits_fk) REFERENCES habits(name) ON DELETE CASCADE
);


DROP TABLE leaderboard;

CREATE TABLE dayPoints (
    id UUID PRIMARY KEY,
    user_id_fk UUID NOT NULL,
    date_register_fk UUID NOT NULL,
    points INTEGER NOT NULL,
    FOREIGN KEY (user_id_fk) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (date_registe_id) REFERENCES date_register(id) ON DELETE CASCADE
);

ALTER TABLE users ADD COLUMN points INTEGER NOT NULL DEFAULT 0;

ALTER TABLE users ADD COLUMN email TEXT;