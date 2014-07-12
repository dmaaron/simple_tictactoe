var counter = 0;
var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

//checks rows for a winning state
function check_rows() {
	var row_length = board.length;
	for (i = 0; i < row_length; i++) {
		if (Math.abs(board[i][0] + board[i][1] + board[i][2]) === 3) {
			endgame();
		}
	}
}

//checks for a tie
function check_tie() {
	if (counter === 9) {
		alert('Tie game!');
		reset_game();
	}
}

//checks columns for a winning state
function check_columns() {
	var column_length = board.length;
	for (i = 0; i < column_length; i++) {
		if (Math.abs(board[0][i] + board[1][i] + board[2][i]) === 3) {
			endgame();
		}
	}
}

//checks diagonals for a winning state
function check_diagonals() {
	if (Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3) {
		endgame();
	} else if (Math.abs(board[2][0] + board[1][1] + board[0][2]) === 3) {
		endgame();
	}
}

//checks every possible win state 
function check_winner() {
	check_rows();
	check_columns();
	check_diagonals();
}

//determines which player has won and notifies them, then calls a function reset the board

function endgame() {
	if (counter % 2 === 0) {
		alert('Player 1 has won');
	} else {
		alert('Player 2 has won');
	}
	reset_game();
}

//resets the game state
function reset_game() {
	board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	$('td').css('background-color', 'white');
	$('td').text("");
	counter = 0;
}

//plays a turn, adding a value of 1 or -1 to each cel if that cel has no value, 
//adds one to the game counter, checks for a winner and determines if the game has ended in a tie
function play_turn() {
	var row = $(this).parent().data('row');
	var column = $(this).data('column');
	if (board[row][column] === 0) {
		if (counter % 2 === 0) {
			board[row][column] = 1;
			$(this).css('background-color', 'red');
			$(this).text('X');
		} else {
			board[row][column] = -1;
			$(this).css('background-color', 'blue');
			$(this).text('O');
		}
		counter++;
		check_winner();
		check_tie();
	}
}

$(document).ready(function() {
	$('#game_board').on('click', 'td', play_turn);
	$('.reset').on('click', reset_game);
});
