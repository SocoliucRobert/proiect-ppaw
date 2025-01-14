import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserAccessor {
  async fetchUsers() {
    return await prisma.user.findMany({
      include: {
        questions: true,
        answers: true,   
      },
    });
  }

  async createUser(user) {
    return await prisma.user.create({ data: user });
  }

  async updateUser(id, updates) {
    return await prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }
}

class QuestionAccessor {
  async fetchQuestions() {
    return await prisma.question.findMany({
      include: {
        user: true, 
        answers: true, 
      },
    });
  }

  async createQuestion(question) {
    return await prisma.question.create({ data: question });
  }

  async updateQuestion(id, updates) {
    return await prisma.question.update({
      where: { id },
      data: updates,
    });
  }

  async deleteQuestion(id) {
    return await prisma.question.delete({ where: { id } });
  }
}

class AnswerAccessor {
  async fetchAnswers() {
    return await prisma.answer.findMany({
      include: {
        user: true, 
        question: true, 
      },
    });
  }

  async createAnswer(answer) {
    return await prisma.answer.create({ data: answer });
  }

  async updateAnswer(id, updates) {
    return await prisma.answer.update({
      where: { id },
      data: updates,
    });
  }

  async deleteAnswer(id) {
    return await prisma.answer.delete({ where: { id } });
  }
}

class QuizAccessor {
  async fetchQuizzes() {
    return await prisma.quiz.findMany({
      include: {
        questions: true, 
      },
    });
  }

  async createQuiz(quiz) {
    return await prisma.quiz.create({ data: quiz });
  }

  async updateQuiz(id, updates) {
    return await prisma.quiz.update({
      where: { id },
      data: updates,
    });
  }

  async deleteQuiz(id) {
    return await prisma.quiz.delete({ where: { id } });
  }
}

class QuizResultAccessor {
  async fetchQuizResults() {
    return await prisma.quizResult.findMany({
      include: {
        quiz: true, 
        user: true, 
      },
    });
  }

  async createQuizResult(quizResult) {
    return await prisma.quizResult.create({ data: quizResult });
  }

  async updateQuizResult(id, updates) {
    return await prisma.quizResult.update({
      where: { id },
      data: updates,
    });
  }

  async deleteQuizResult(id) {
    return await prisma.quizResult.delete({ where: { id } });
  }
}

class SubscriptionAccessor {
  async fetchSubscriptions() {
    return await prisma.subscription.findMany({
      include: {
        user: true, 
      },
    });
  }

  async createSubscription(subscription) {
    return await prisma.subscription.create({ data: subscription });
  }

  async updateSubscription(id, updates) {
    return await prisma.subscription.update({
      where: { id },
      data: updates,
    });
  }

  async deleteSubscription(id) {
    return await prisma.subscription.delete({ where: { id } });
  }
}

class ContactAccessor {
  async fetchContacts() {
    return await prisma.contact.findMany({
      include: {
        user: true, 
      },
    });
  }

  async createContact(contact) {
    return await prisma.contact.create({ data: contact });
  }

  async updateContact(id, updates) {
    return await prisma.contact.update({
      where: { id },
      data: updates,
    });
  }

  async deleteContact(id) {
    return await prisma.contact.delete({ where: { id } });
  }
}

export { 
  UserAccessor, 
  QuestionAccessor, 
  AnswerAccessor, 
  QuizAccessor, 
  QuizResultAccessor, 
  SubscriptionAccessor, 
  ContactAccessor 
};
