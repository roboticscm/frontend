'use strict';

const { Model } = require('objection');

class Lesson extends Model {
    static get tableName() {
        return 'lesson';
    }
}

module.exports = {
    Lesson
};