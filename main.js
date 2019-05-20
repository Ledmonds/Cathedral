// Setup Phase
function setup()
{
	createCanvas(window.innerWidth, window.innerHeight);
	Board = new Board(10);
}


// Mouse Actions
function mouseClicked()
{
	Board.PlacePiece(Board.GetMouseXRelative(mouseX), Board.GetMouseYRelative(mouseY))
}

// Keyboard Actions
function keyPressed()
{
	Board.RotatePiece();
}



// Draw Phase
function draw()
{
	clear();
	
	background(0);

	Board.IterateBoard();
}