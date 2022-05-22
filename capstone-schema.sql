-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/eG6IhY
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBD

CREATE TABLE [todo] (
    [id] int IDENTITY(1,1) NOT NULL ,
    [title] string  NOT NULL ,
    [description] string  NOT NULL ,
    [status] string  NOT NULL ,
    [date_created] dateTime  NOT NULL CONSTRAINT [DF_todo_date_created] DEFAULT (getutcdate()),
    [date_updated] dateTime  NOT NULL CONSTRAINT [DF_todo_date_updated] DEFAULT (getutcdate()),
    [comments] int  NOT NULL ,
    CONSTRAINT [PK_todo] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [project] (
    [id] int IDENTITY(1,1) NOT NULL ,
    [name] string  NOT NULL ,
    [description] string  NULL ,
    [todolists] int  NOT NULL ,
    CONSTRAINT [PK_project] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [user] (
    [username] string IDENTITY(1,1) NOT NULL ,
    [name] string  NOT NULL ,
    [profile_image] string  NOT NULL CONSTRAINT [DF_user_profile_image] DEFAULT (default.png),
    [todos] int  NOT NULL ,
    CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED (
        [username] ASC
    )
)

CREATE TABLE [project_user] (
    [id] int IDENTITY(1,1) NOT NULL ,
    [project_id] int  NOT NULL ,
    [user_id] string  NOT NULL ,
    CONSTRAINT [PK_project_user] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [todolist] (
    [id] int IDENTITY(1,1) NOT NULL ,
    [name] string  NOT NULL ,
    [description] string  NULL ,
    [todos] int  NOT NULL ,
    CONSTRAINT [PK_todolist] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [comment] (
    [id] int IDENTITY(1,1) NOT NULL ,
    [message] string  NOT NULL ,
    [todo] int  NOT NULL ,
    [user] int  NOT NULL ,
    CONSTRAINT [PK_comment] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

ALTER TABLE [todo] WITH CHECK ADD CONSTRAINT [FK_todo_comments] FOREIGN KEY([comments])
REFERENCES [comment] ([id])

ALTER TABLE [todo] CHECK CONSTRAINT [FK_todo_comments]

ALTER TABLE [project] WITH CHECK ADD CONSTRAINT [FK_project_todolists] FOREIGN KEY([todolists])
REFERENCES [todolist] ([id])

ALTER TABLE [project] CHECK CONSTRAINT [FK_project_todolists]

ALTER TABLE [user] WITH CHECK ADD CONSTRAINT [FK_user_todos] FOREIGN KEY([todos])
REFERENCES [todo] ([id])

ALTER TABLE [user] CHECK CONSTRAINT [FK_user_todos]

ALTER TABLE [project_user] WITH CHECK ADD CONSTRAINT [FK_project_user_project_id] FOREIGN KEY([project_id])
REFERENCES [project] ([id])

ALTER TABLE [project_user] CHECK CONSTRAINT [FK_project_user_project_id]

ALTER TABLE [project_user] WITH CHECK ADD CONSTRAINT [FK_project_user_user_id] FOREIGN KEY([user_id])
REFERENCES [user] ([username])

ALTER TABLE [project_user] CHECK CONSTRAINT [FK_project_user_user_id]

ALTER TABLE [todolist] WITH CHECK ADD CONSTRAINT [FK_todolist_todos] FOREIGN KEY([todos])
REFERENCES [todo] ([id])

ALTER TABLE [todolist] CHECK CONSTRAINT [FK_todolist_todos]

ALTER TABLE [comment] WITH CHECK ADD CONSTRAINT [FK_comment_todo] FOREIGN KEY([todo])
REFERENCES [todo] ([id])

ALTER TABLE [comment] CHECK CONSTRAINT [FK_comment_todo]

ALTER TABLE [comment] WITH CHECK ADD CONSTRAINT [FK_comment_user] FOREIGN KEY([user])
REFERENCES [user] ([username])

ALTER TABLE [comment] CHECK CONSTRAINT [FK_comment_user]

COMMIT TRANSACTION QUICKDBD