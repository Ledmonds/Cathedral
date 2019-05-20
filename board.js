class Board
{
	// Constructor
	constructor(boardGridSize)
	{
		// Node Properties		
		this.NodeSize = 40; //px;


		// Grid Properties
		this.BoardGridSize = boardGridSize;
		this.GridColor = color(0, 0, 0, 255);
		this.BorderColor = color(0, 0, 0, 255);

		// Other Properties
		this.BoardBackgroundColor = color(182, 155, 76, 255);
		this.HighlightColor = color(0, 0, 0, 120);
		this.TurnTracker = true;

		// Drawing Offset
		this.BoardOffsetX = (window.innerWidth/2)-(this.BoardGridSize*this.NodeSize)/2;
		this.BoardOffsetY = (window.innerHeight/2)-((this.BoardGridSize*this.NodeSize)/2);

		// Player Properties
		this.Player1 = new Player(color(20,255,255,255));
		this.Player2 = new Player(color(255,20,255,255));
		this.HasPlayerPlayed = false;

		// Piece Properties
		this.TestPiece = new Piece();

		// Board Array
		this.BoardArray = [boardGridSize][boardGridSize];
	}


	// Gettors
	GetBoardSize()
	{
		return this.BoardGridSize;
	}
	GetMouseXRelative(mouseX)
	{
		return floor((mouseX - this.BoardOffsetX) / this.NodeSize);
	}
	GetMouseYRelative(mouseY)
	{
		return floor((mouseY - this.BoardOffsetY) / this.NodeSize);
	}


	// Helpers
	PlacePiece(mouseXRelative, mouseYRelative)
	{
		if (this.IsMouseOverBoard(mouseXRelative, mouseYRelative) && this.TestPiece.IsPieceInBounds(mouseXRelative, mouseYRelative, this.BoardGridSize))
		{
			console.log("Piece Placed");

			for (var y = 0; y < this.TestPiece.length; ++y)
			{
				for (var x = 0; x < this.TestPiece[0].length; ++x)
				{
					this.BoardArray.splice(this.BoardArray[mouseYRelative+y],this.BoardArray[mouseXRelative+x], this.TestPiece[y][x]);
				}
			}
			console.log(this.BoardArray);

		}
		else
		{
			console.log("Can't Place Piece");	
		}
	}
	RotatePiece()
	{
		this.TestPiece.RotatePiece();
	}


	// Checkers
	IsMouseOverBoard(mouseXRelative, mouseYRelative)
	{
		return (mouseXRelative >= 0 && mouseXRelative < this.BoardGridSize && mouseYRelative >= 0 && mouseYRelative < this.BoardGridSize) ? true : false;
	}



	//Iterators
	IterateBoard() //ToDo make it possible to have more players than 2 here.
	{
		if (this.HasPlayerPlayed)
		{

		}

		this.DrawBoard();
	}


	// Drawers
	DrawBoard()
	{
		translate(this.BoardOffsetX, this.BoardOffsetY);

		this.DrawBackground();
		this.DrawGrid();
		//this.DrawMouseHighlight();
		this.DrawPiece();
	}

	DrawBackground()
	{
		fill(this.BoardBackgroundColor);
		rect(0, 0, this.BoardGridSize*this.NodeSize,this.BoardGridSize*this.NodeSize);
	}

	DrawGrid()
	{
		stroke(this.GridColor);

		for (var i = 1; i < this.BoardGridSize; ++i)
		{
			line(0, this.NodeSize*i, this.NodeSize*this.BoardGridSize, this.NodeSize*i);

			for (var j = 1; j < this.BoardGridSize; ++j)
			{
				line(this.NodeSize*j, 0, this.NodeSize*j, this.NodeSize*this.BoardGridSize);
			}
		}
	}

	DrawMouseHighlight()
	{
		var mouseXRelative = this.GetMouseXRelative(mouseX);
		var mouseYRelative = this.GetMouseYRelative(mouseY);

		if (this.IsMouseOverBoard(mouseXRelative, mouseYRelative))
		{
			fill(this.HighlightColor);
			rect(mouseXRelative*this.NodeSize, mouseYRelative*this.NodeSize, this.NodeSize, this.NodeSize);
		}
	}

	DrawPiece()
	{
		var mouseXRelative = this.GetMouseXRelative(mouseX);
		var mouseYRelative = this.GetMouseYRelative(mouseY);

		this.TestPiece.DrawPiece(this.NodeSize, mouseXRelative, mouseYRelative, this.BoardGridSize);
	}
};