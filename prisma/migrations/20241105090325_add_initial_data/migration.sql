-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER,
    "answer_text" TEXT,
    "is_correct" BOOLEAN DEFAULT false,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "message" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(50),
    "question_text" TEXT,
    "image_url" VARCHAR(255),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_results" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER,
    "question_id" INTEGER,
    "selected_answer_id" INTEGER,
    "is_correct" BOOLEAN,

    CONSTRAINT "quiz_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "score" INTEGER,
    "total_questions" INTEGER,
    "correct_answers" INTEGER,
    "started_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMPTZ(6),

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "price" DECIMAL(10,2),
    "duration_months" INTEGER,
    "description" TEXT,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "test_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_selected_answer_id_fkey" FOREIGN KEY ("selected_answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- Popularea tabelului users
INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com'),
('bob_johnson', 'bob@example.com'),
('alice_williams', 'alice@example.com'),
('charlie_brown', 'charlie@example.com');

-- Popularea tabelului questions
INSERT INTO questions (category, question_text, image_url) VALUES
('Geografie', 'Care este capitala Franței?', 'https://example.com/images/france.jpg'),
('Istorie', 'Cine a fost primul președinte al Statelor Unite?', 'https://example.com/images/washington.jpg'),
('Știință', 'Care este simbolul chimic pentru apă?', 'https://example.com/images/water.jpg'),
('Sport', 'Ce sport este cunoscut sub numele de "jocul frumos"?', 'https://example.com/images/soccer.jpg'),
('Tehnologie', 'Ce înseamnă CPU?', 'https://example.com/images/cpu.jpg');

-- Popularea tabelului answers
INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(1, 'Paris', TRUE),
(1, 'Londra', FALSE),
(1, 'Berlin', FALSE),
(2, 'George Washington', TRUE),
(2, 'Thomas Jefferson', FALSE),
(2, 'Abraham Lincoln', FALSE),
(3, 'H2O', TRUE),
(3, 'CO2', FALSE),
(3, 'O2', FALSE),
(4, 'Fotbal', TRUE),
(4, 'Baschet', FALSE),
(4, 'Baseball', FALSE),
(5, 'Unitate centrală de procesare', TRUE),
(5, 'Unitate personală de calculator', FALSE),
(5, 'Unitate de control a procesării', FALSE);

-- Popularea tabelului quizzes
INSERT INTO quizzes (user_id, score, total_questions, correct_answers) VALUES
(1, 85, 5, 4),
(2, 90, 5, 5),
(3, 60, 5, 3),
(4, 75, 5, 4),
(5, 50, 5, 2);

-- Popularea tabelului quiz_results
INSERT INTO quiz_results (quiz_id, question_id, selected_answer_id, is_correct) VALUES
(1, 1, 1, TRUE),
(1, 2, 1, TRUE),
(1, 3, 1, TRUE),
(1, 4, 1, TRUE),
(1, 5, 2, FALSE),
(2, 1, 1, TRUE),
(2, 2, 1, TRUE),
(2, 3, 1, TRUE),
(2, 4, 1, TRUE),
(2, 5, 1, TRUE),
(3, 1, 2, FALSE),
(3, 2, 1, TRUE),
(3, 3, 2, FALSE),
(3, 4, 1, TRUE),
(3, 5, 3, FALSE),
(4, 1, 1, TRUE),
(4, 2, 2, FALSE),
(4, 3, 3, FALSE),
(4, 4, 1, TRUE),
(4, 5, 1, TRUE),
(5, 1, 1, TRUE),
(5, 2, 2, FALSE),
(5, 3, 3, FALSE),
(5, 4, 1, TRUE),
(5, 5, 3, FALSE);

-- Popularea tabelului subscriptions
INSERT INTO subscriptions (name, price, duration_months, description) VALUES
('Plan de bază', 9.99, 1, 'Acces la quizuri de bază și caracteristici.'),
('Plan standard', 19.99, 3, 'Acces la toate quizurile și caracteristici suplimentare.'),
('Plan premium', 29.99, 6, 'Acces nelimitat la toate quizurile și caracteristici premium.'),
('Plan de familie', 49.99, 12, 'Acces pentru până la 4 utilizatori cu caracteristici premium.'),
('Plan pentru studenți', 14.99, 3, 'Plan cu discount pentru studenți cu acces la toate quizurile.');


-- Exemplu migrare inserare
ALTER TABLE questions ADD COLUMN difficulty VARCHAR(50); 
-- Exemplu migrare stergere
ALTER TABLE users DROP COLUMN IF EXISTS age;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;