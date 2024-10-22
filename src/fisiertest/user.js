class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

class Quiz {
    constructor(id, userId, score, totalQuestions) {
        this.id = id;
        this.userId = userId;
        this.score = score;
        this.totalQuestions = totalQuestions;
    }
}
