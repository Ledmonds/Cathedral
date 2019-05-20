class Piece {
	constructor()
	{
		// Properties
		this.PieceArray = [	['*','x','*'],
							['x','x','x'],
							['*','x','*'],
							['*','x','*'] ];

		this.PieceErrorColor = color(255, 0, 0 ,255);							
		this.PieceColor = color(0, 0, 0, 120);

		// ToDo: Recode the mouse posistioning a little better to be dynamic.
		this.PieceXMouseOffset = (floor(this.PieceArray[0].length/2) % 2 == 0) ? floor(this.PieceArray[0].length/2)-1 : floor(this.PieceArray[0].length/2);
		this.PieceYMouseOffset = (floor(this.PieceArray.length/2) % 2 == 0) ? floor(this.PieceArray.length/2)-1 : floor(this.PieceArray.length/2);
	}

	// Drawers
	DrawPiece(nodeSize, mouseXRelative, mouseYRelative, boardGridSize)
	{
		mouseXRelative -= this.PieceXMouseOffset;
		mouseYRelative -= this.PieceYMouseOffset;

		for (var y = 0; y < this.PieceArray.length; ++y)
		{
			for (var x = 0; x < this.PieceArray[y].length; ++x)
			{
				if (this.PieceArray[y][x] == 'x')
				{
					this.IsNodeInBounds(mouseXRelative+x, mouseYRelative+y, boardGridSize) ? fill(this.PieceColor) : fill(this.PieceErrorColor);
					rect((mouseXRelative+x)*nodeSize, (mouseYRelative+y)*nodeSize, nodeSize, nodeSize);	
				}
			}
		}
	}


	// Checkers
	IsNodeInBounds(nodeXRelative, nodeYRelative, boardGridSize)
	{
		return (nodeXRelative >= 0 && nodeXRelative < boardGridSize && nodeYRelative >= 0 && nodeYRelative < boardGridSize) ? true : false;
	}
	IsPieceInBounds(mouseXRelative, mouseYRelative, boardGridSize)
	{
		mouseXRelative -= this.PieceXMouseOffset;
		mouseYRelative -= this.PieceYMouseOffset;

		for (var y = 0; y < this.PieceArray.length; ++y)
		{
			for (var x = 0; x < this.PieceArray[y].length; ++x)
			{
				if (!this.IsNodeInBounds(mouseXRelative+x, mouseYRelative+y, boardGridSize)) return false;
			}
		}
		return true;
	}


	// Herlpers
	//Todo: find a better soloution here.
	RotatePiece()
	{
		this.PieceArray = this.TransposeArray(this.PieceArray);
		this.PieceArray = this.ReverseArray(this.PieceArray);
	}
	TransposeArray(a) {
		return Object.keys(a[0]).map(function(c) {
       			return a.map(function(r) { return r[c]; });
		});
	}
	ReverseArray(a) {
		for (var i = 0; i < a.length; ++i) {
			a[i] = a[i].reverse();
		}
		return a;
	}
}