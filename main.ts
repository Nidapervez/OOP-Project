#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

class Student {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Person {
    students: Student[] = [];

    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    do {
        console.log(chalk.bgMagenta("*********WELCOME TO THE CHATBOX**********"));

        let ans = await inquirer.prompt({
            type: 'list',
            message: 'Who would you like to talk to?',
            choices: ['Teacher', 'Student'],
            name: 'select'
        });

        if (ans.select === 'Teacher') {
            console.log(chalk.bgGreen("Hello"));
            console.log(chalk.bgGreen("How are you?"));
        }

        if (ans.select === 'Student') {
            const ans = await inquirer.prompt({
                type: 'input',
                message: 'Which student do you need to talk to?',
                name: 'student'
            });

            const student = persons.students.find(value => value.name === ans.student);

            if (!student) {
                const newStudent = new Student(ans.student);
                persons.addStudent(newStudent);
                console.log(chalk.bgMagenta(`Hello ${newStudent.name}, how are you?`));
            } else {
                console.log(chalk.bgCyan(`Hello ${student.name}, how are you?`));
            }

            console.log(chalk.bgGreen('Current students:'), persons.students);
        }
    } while (true);
};

programStart(persons);
