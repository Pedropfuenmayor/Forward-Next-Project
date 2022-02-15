-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "what" VARCHAR(300) NOT NULL,
    "due_date" DATE NOT NULL,
    "test_until" DATE NOT NULL,
    "succes_criteria" VARCHAR(300) NOT NULL,
    "idea_id" SERIAL NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("idea_id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "is_selected" BOOLEAN,
    "project_id" INTEGER,
    "challenge_type" VARCHAR(100),

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges_types" (
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "challenges_types_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "ideas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "is_selected" BOOLEAN,
    "challenge_id" SERIAL NOT NULL,
    "effort" BOOLEAN,
    "impact" BOOLEAN,

    CONSTRAINT "ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity_questions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "challenge_id" SERIAL NOT NULL,

    CONSTRAINT "opportunity_questions_pkey" PRIMARY KEY ("challenge_id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(300) NOT NULL,
    "email" VARCHAR(300) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actions_id_key" ON "actions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_questions_id_key" ON "opportunity_questions"("id");

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_challenge_type_fkey" FOREIGN KEY ("challenge_type") REFERENCES "challenges_types"("type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "opportunity_questions" ADD CONSTRAINT "opportunity_questions_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
