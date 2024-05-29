import { MonteCarlo } from "./MonteCarloTreeSearch.js";
import { Play, TicTacToeBoard, TicTacToeBoardState } from "./TicTacToeBoard.js";
import inquirer from 'inquirer';
import Rx from 'rxjs';

class Game {
    prompts = new Rx.Subject();
    BOARD = new TicTacToeBoard();
    AI = new MonteCarlo<Play>(this.BOARD, {msFirst: 50, msNormal: 10});
    STATE: TicTacToeBoardState;
    playerNum: number;
    aiNum: number;

    constructor() {
        process.stdout.write(`Initializing AI...`);
        this.STATE = this.BOARD.start();
        this.AI.getPlay(); // initialize the engine
        console.log(`DONE!`);

        inquirer.prompt(this.prompts).ui.process.subscribe({
            next: this.handleInput.bind(this),
            error: (error) => { console.error(`Error! ${error}`); },
            complete: () => { console.log(`Goodbye... Thanks for playing!`); }
        });
    }

    play() {
        if (this.STATE !== undefined) {
            this.STATE = this.BOARD.start();
            this.AI.replay();
        }
        this.AI.update(this.STATE);

        this.promptForPlayerNumber();
    }

    promptForPlayerNumber() {
        this.prompts.next({type: 'confirm', name: 'playerIsFirst', message: 'Would you like to go first?', default: true, askAnswered: true});
    }
    promptToPlayAgain() {
        this.prompts.next({type: 'confirm', name: 'restart', message: 'Would you like to play again?', default: true, askAnswered: true});
    }

    handleInput(answers: {name: string, answer: any}) {
        switch (answers.name) {
            case 'playerIsFirst':
                if (answers.answer) {
                    this.playerNum = 1;
                    this.aiNum = 2;
                } else {
                    this.playerNum = 2;
                    this.aiNum = 1;
                }
                this.checkDone();
                break;
            case 'play':
                this.STATE = this.BOARD.nextState(this.STATE, {player: this.playerNum, square: answers.answer});
                this.AI.update(this.STATE);
                this.checkDone();
                break;
            case 'restart':
                if (answers.answer) this.play();
                else this.prompts.complete();
                break;
        }
    }

    checkDone() {
        console.log(`Board State`);
        this.STATE.printState();
        const winner = this.BOARD.winner([this.STATE]);
        if (winner) {
            console.log(`The game has ended`);
            if (winner === -1) console.log(`DRAW`);
            else if (winner === this.playerNum) console.log(`No way!!!  You won!`);
            else if (winner === this.aiNum) console.log(`I won... don't feel too bad!`);
            this.promptToPlayAgain();
        } else {
            if (this.BOARD.currentPlayer(this.STATE) === this.playerNum) this.getPlayerMove();
            else this.makeMove();
        }
    }

    makeMove() {
        let play = this.AI.getPlay();
        //this.AI.printStats();
        this.STATE = this.BOARD.nextState(this.STATE, play);
        let wins = this.AI.wins[this.aiNum].get(this.STATE.normalize());
        let plays = this.AI.plays[this.aiNum].get(this.STATE.normalize());
        console.log(`AI says to play: ${play.square} (${this.BOARD.playToOutput(play)}) (Win confidence: ${(100*wins/plays).toFixed(2)}%)`);
        this.AI.update(this.STATE);
        this.checkDone();
    }

    getPlayerMove() {
        let choices = this.BOARD.legalPlays([this.STATE]).map(play => ({name: `Square ${play.square} (${this.BOARD.playToOutput(play)})`, value: play.square}));
        this.prompts.next({type: 'list', name: 'play', message: 'Which play would you like to pick?', pageSize: 9, choices, askAnswered: true});
    }
}

let game = new Game();

game.play();