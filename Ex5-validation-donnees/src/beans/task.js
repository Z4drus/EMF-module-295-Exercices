class Task {

    #id;
    #title;
    #description;
    #status;
    #createdAt;
    #dueDate;
    
    constructor(id, title, description, status, createdAt, dueDate) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#status = status;
        this.#createdAt = createdAt;
        this.#dueDate = dueDate;
    }

    getId() {
        return this.#id;
    }
    getTitle() {
        return this.#title;
    }
    getDescription() {
        return this.#description;
    }
    getStatus() {
        return this.#status;
    }
    getCreatedAt() {
        return this.#createdAt;
    }
    getDueDate() {
        return this.#dueDate;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            status: this.#status,
            createdAt: this.#createdAt,
            dueDate: this.#dueDate
        };
    }
}

module.exports = { Task };