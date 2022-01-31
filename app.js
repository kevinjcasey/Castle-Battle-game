// Worked with Kevin Doots

//================================
// Objects and variables
// ===============================

const player1 = {
    name: "",
    hitpoints: 10,
    barracks: []
}

const player2 = {
    name: "computer",
    hitpoints: 10,
    barracks: []
}

let gameType = '';

//================================
// Fucntions
// ===============================

//================================
// Initiates playerTurn 
// ===============================
const gameStart = () => {
    $('#computer-game').on('click', () => {
        gameType = 'computer-game';
    })
    
    // for creating PvP mode
    // $('#player-game').on('click', () => {
    //     gameType = 'player-game';
    //     console.log(gameType);
    // })
}


//================================
// Players turn
// ===============================
 const playerTurn = () => {
     // Update HP
    $('.player-hp').text(`Player HP: ${player1.hitpoints}`);
    $('.computer-hp').text(`Computer HP: ${player1.hitpoints}`);
    // removes previous prompt and button from browser
    $('#start-prompt h2').remove()
    $('button#computer-game').remove()
    // Create and select buttons
    const $playerTurn = $('<section>').attr('id','create-or-select')
    $('<h2>').text('Would you like to create a peon or select a peon?').appendTo($playerTurn)
    $('<button>').attr('type', 'button').attr('id', 'create').text('Create peon').appendTo($playerTurn)
    $('<button>').attr('type', 'button').attr('id', 'select').text('Select peon').appendTo($playerTurn)
    $('section#start-prompt').after($playerTurn)
    // Initiates create or select functions
    $('#create').on('click', createPeon)
    $('#select').on('click', selectPeon)
 }

//================================
// Create peon
// ===============================
const createPeon = () => {
    // removes previous prompts and buttons
    $('#create-or-select h2').remove()
    $('button#create').remove()
    $('button#select').remove()
    // create section
    const $createPeon = $('<section>').attr('id','create-peon')
    $('<h2>').text('What would you like to name this peon?').appendTo($createPeon)
    $createPeon.append('<input id="name" type="text"/>')
    $createPeon.append('<input id="submit" type="submit"/>')
    $('section#create-or-select').after($createPeon)


    // store player input
    $('#submit').on('click', () => { // submit via 'enter' key as well?

        // if player leaves input field blank
        let $peonInput = $('#name').val()
        if ($peonInput === '') {
            alert('You forgot to name the peon! We added one for you.')
            $peonInput = 'Dave'
        }
        // stores the peon name and role ('nothing') in Barracks table
        const $peonName = $('<td>').text($peonInput)
        const $peonInfo = $('<tr>').append($peonName).append('<td>nothing</td>')
        $peonInfo.appendTo('#player1Barracks')
        // initiates loopPeons --> computer turn
        loopPeons('create')
    })
}  

//================================
// Select peon
// ===============================
const selectPeon = () => {
    // removes previous prompts and buttons
    $('#create-or-select h2').remove()
    $('button#create').remove()
    $('button#select').remove()

    const $selectPeon = $('<section>').attr('id', 'select-peon')
    $('<h2>').text("Which peon would you like to select?").appendTo($selectPeon)
    $selectPeon.append('<input id="select-name" type="text"/>')
    $selectPeon.append('<input id="submit-attack" type="submit" value="Attack"/>')
    $selectPeon.append('<input id="submit-repair" type="submit" value="Repair"/>')
    $('section#create-or-select').after($selectPeon)
    
    // changing peon role to attack
    $('#submit-attack').on('click', () => {
        const $nameInput = $('#select-name').val()
        // if input field is left blank
        if ($nameInput === '') {
            alert(`Invalid selection. Try again`)
            console.log('Please excuse the error. It allows the user to try again!');
            $nameInput = 'You have been punished for your stupidity.'
        // if input field does not recognize input as any of the listed peons
        } else if ($(`td:contains('${$nameInput}')`).text() != $nameInput) {
        console.log($(`td:contains('${$nameInput}')`).text())
        alert('Invalid choice. Try again.')
        console.log('Please excuse the error. It allows the user to try again!');
        $nameInput = 'You have been punished for your stupidity.'
        }
        $(`td:contains(${$nameInput})`).siblings().text('attack')
        loopPeons('select')

    })
    // changing peon role to repair
    $('#submit-repair').on('click', () => {
        const $nameInput = $('#select-name').val()
        // if input field is left blank
        if ($nameInput === '') {
        alert(`Invalid selection. Try again`)
            console.log('Please excuse the error. It allows the user to try again!');
            $nameInput = 'You have been punished for your stupidity.'
        // if input field does not recognize input as any of the listed peons
        } else if ($(`td:contains('${$nameInput}')`).text() != $nameInput) {
            console.log($(`td:contains('${$nameInput}')`).text())
            alert('Invalid choice. Try again.')
            console.log('Please excuse the error. It allows the user to try again!');
            $nameInput = 'You have been punished for your stupidity.'
            }
        $(`td:contains(${$nameInput})`).siblings().text('repair')
        loopPeons('select')
    })
    
}

//================================
// Loop through peon actions
// ===============================
const loopPeons = (action) => {
    if (action == 'create') {
        // removing previous prompts and buttons
        $('#create-peon h2').remove()
        $('input#name').remove()
        $('input#submit').remove()
    } else if (action == 'select') {
        $('#select-peon h2').remove()
        $('input#select-name').remove()
        $('input#submit-attack').remove()
        $('input#submit-repair').remove()
    }
    // searches for corresponding role and allows user to change
    const $numAttack = $("td:contains('attack')").length
    player2.hitpoints -= $numAttack

    const $numRepair = $("td:contains('repair')").length
    player1.hitpoints += $numRepair
    // text showing the result after peon loop 
    const $peonResults = $('<p>').text(`Your peons healed you for ${$numRepair} hitpoints and did ${$numAttack} damage to the computer.`)
    $('section#display').before($peonResults)
    // computer turn start
    computerTurn()
}

//================================
// Computer turn
// ===============================
const computerTurn = () => {
    // math math math
    const computerAttack = Math.floor(Math.random() * 5)
    const computerRepair = Math.floor(Math.random() * 5)
    const computerMove = Math.floor(Math.random() * 2)
    if (computerMove === 0) {
        player1.hitpoints -= computerAttack
        const $takeDamage = $('<p>').attr('id', 'computer-damage').text(`The computer did ${computerAttack} damage to you. You now have ${player1.hitpoints} hitpoints.`)
        $('section#display').before($takeDamage)
    } else if (computerMove === 1) {
        player2.hitpoints += computerRepair
        const $healSelf= $('<p>').attr('id', 'computer-heal').text(`The computer healed itself for ${computerRepair} and currently has ${player2.hitpoints} hitpoints. You have ${player1.hitpoints} hitpoints.`)
        $('section#display').before($healSelf)
    }
    checkWin()
}

//================================
// Win condition
// ===============================
const checkWin = () => {
     // Update HP
  $('.player-hp').text(`Player HP: ${player1.hitpoints}`);
  $('.computer-hp').text(`Computer HP: ${player2.hitpoints}`);
    // tie game
    if (player1.hitpoints <= 0 && player2.hitpoints <= 0) {
        const $mutualDestruction = $('<h2>').text('You killed each other. There is no winner. Such is war.')
        $('section#display').before($mutualDestruction)
    // player win
    } else if (player1.hitpoints > 0 && player2.hitpoints <= 0) {
        const $poorComputer = $('<h2>').text('Congrats you win!')
        $('section#display').before($poorComputer)
    // computer win
    } else if (player1.hitpoints <= 0 && player2.hitpoints > 0) {
        const $poorPlayer = $('<h2>').text('You lose! Better luck next time!')
        $('section#display').before($poorPlayer)
    // game can continue
    } else {
        const $warGoesOn = $('<h2>').text(`You're both still alive. Would you like to continue?`)
        // need a line break in here to bring buttons below and centered
        $('<button>').attr('type', 'button').attr('id', 'continue').text('Continue').appendTo($warGoesOn)
        $('section#display').before($warGoesOn)
        $('<button>').attr('type', 'button').attr('id', 'give-up').text('Give up').appendTo($warGoesOn)
        $('section#display').before($warGoesOn)
    }
    $('#continue').on('click', clearContinue)
    $('#give-up').on('click', gameOver )
}

//================================
// Continue 
// ===============================
const clearContinue = () => {
    // removes all previous prompts and buttons to not have doubling
    $('h2').remove()
    $('button').remove()
    $('p').remove()
    $('#create-or-select').remove()
    $('select-peon').remove()
    $('create-peon').remove()
    // starts over at playerTurn
    playerTurn()
}

//================================
// Game over
// ===============================
const gameOver = () => {
    $('h2').remove()
    $('button').remove()
    const $giveUp = $('<p>').text(`Play again soon!`)
    $('section#display').before($giveUp)
}

//================================
// Post DOM
// ===============================
$(() => {

    // game type start 
    $('#computer-game').on('click', playerTurn)

    // for adding add PvP mode
    // $('#player-game').on('click', () => {
    //     gameType = 'player-game';
    //     playerTurn()
})
