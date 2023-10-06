import itertools
import random


class Minesweeper():
    """
    Minesweeper game representation
    """

    def __init__(self, height=8, width=8, mines=8):

        # Set initial width, height, and number of mines
        self.height = height
        self.width = width
        self.mines = set()

        # Initialize an empty field with no mines
        self.board = []
        for i in range(self.height):
            row = []
            for j in range(self.width):
                row.append(False)
            self.board.append(row)

        # Add mines randomly
        while len(self.mines) != mines:
            i = random.randrange(height)
            j = random.randrange(width)
            if not self.board[i][j]:
                self.mines.add((i, j))
                self.board[i][j] = True

        # At first, player has found no mines
        self.mines_found = set()
        
    def print(self):
        """
        Prints a text-based representation
        of where mines are located.
        """
        for i in range(self.height):
            print("--" * self.width + "-")
            for j in range(self.width):
                if self.board[i][j]:
                    print("|X", end="")
                else:
                    print("| ", end="")
            print("|")
        print("--" * self.width + "-")

    def is_mine(self, cell):
        i, j = cell
        return self.board[i][j]

    def nearby_mines(self, cell):
        """
        Returns the number of mines that are
        within one row and column of a given cell,
        not including the cell itself.
        """

        # Keep count of nearby mines
        count = 0

        # Loop over all cells within one row and column
        for i in range(cell[0] - 1, cell[0] + 2):
            for j in range(cell[1] - 1, cell[1] + 2):

                # Ignore the cell itself
                if (i, j) == cell:
                    continue

                # Update count if cell in bounds and is mine
                if 0 <= i < self.height and 0 <= j < self.width:
                    if self.board[i][j]:
                        count += 1

        return count

    def won(self):
        """
        Checks if all mines have been flagged.
        """
        return self.mines_found == self.mines


class Sentence():
    """
    Logical statement about a Minesweeper game
    A sentence consists of a set of board cells,
    and a count of the number of those cells which are mines.
    """

    def __init__(self, cells, count):
        self.cells = set(cells)
        self.count = count

    def __eq__(self, other):
        return self.cells == other.cells and self.count == other.count

    def __str__(self):
        return f"{self.cells} = {self.count}"

    def known_mines(self):
        """
        Returns the set of all cells in self.cells known to be mines.
        지뢰인 셀의 집합 리턴
        """
        return self.cells

    def known_safes(self):
        """
        Returns the set of all cells in self.cells known to be safe.
        안전한 셀의 집합 리턴
        """
        raise NotImplementedError

    def mark_mine(self, cell):
        """
        Updates internal knowledge representation given the fact that
        a cell is known to be a mine.
        """
        raise NotImplementedError

    def mark_safe(self, cell):
        """
        Updates internal knowledge representation given the fact that
        a cell is known to be safe.
        셀에 대한 새로운 정보로 문장을 업데이트
        """
        raise NotImplementedError


class MinesweeperAI():
    """
    Minesweeper game player
    """

    def __init__(self, height=8, width=8):

        # Set initial height and width
        self.height = height
        self.width = width

        # Keep track of which cells have been clicked on
        # 이미 선택된 셀의 집합 (= 지뢰가 아님)
        self.moves_made = set()

        # Keep track of cells known to be safe or mines
        # 지뢰인 셀의 집합, 안전한 셀의 집합
        self.mines = set()
        self.safes = set()

        # List of sentences about the game known to be true
        self.knowledge = []

    def mark_mine(self, cell):
        """
        지뢰인 셀의 집합에 셀을 추가 = AI가 알 수 있게해야함
        AI의 knowledge에 무한루프로 add_knowledge해서 모든 Sentence가 업데이트 되도록함

        Marks a cell as a mine, and updates all knowledge
        to mark that cell as a mine as well.
        
        """
        self.mines.add(cell)
        for sentence in self.knowledge:
            sentence.mark_mine(cell)

    def mark_safe(self, cell):
        """
        안전한 셀의 집합에 셀을 추가 = AI가 알 수 있게해야함
        (동일)

        Marks a cell as safe, and updates all knowledge
        to mark that cell as safe as well.
        """
        self.safes.add(cell)
        for sentence in self.knowledge:
            sentence.mark_safe(cell)

    def add_knowledge(self, cell, count):
        """
        cell = 안전한 셀, count = 인접한 지뢰개수
        AI가 추론할 수 있는 새로운 정보로 
        'self.mine', 'self.safes', 'self.moves_made', 'self.knowledge'를 업데이트해야 합니다.
        
        Called when the Minesweeper board tells us, for a given
        safe cell, how many neighboring cells have mines in them.

        This function should:
            1) mark the cell as a move that has been made
            2) mark the cell as safe
            3) add a new sentence to the AI's knowledge base
               based on the value of `cell` and `count`
            4) mark any additional cells as safe or as mines
               if it can be concluded based on the AI's knowledge base
            5) add any new sentences to the AI's knowledge base
               if they can be inferred from existing knowledge
        """
        print("cell: ", cell)
        print("count: ", count)
        print("self.height: ", self.height)
        # 이미 선택된 셀은 안전한 셀이다
        self.moves_made.add(cell)
        self.safes.add(cell)


        selected_row = cell[0]
        selected_col = cell[1]
        for row in range(selected_row-1, selected_row+2):
            print("row: ", row)
            for col in range(selected_col-1, selected_col+2):
                print("col: ", col)
                if row >= 0 and row < self.height:
                    if col >= 0 and col < self.width:
                        checked_cell = tuple(row, col)
                        self.moves_made.add(checked_cell)





        raise NotImplementedError

    def make_safe_move(self):
        """
        안전한 이동만 반환(아직 수행되지 않은 이동중)

        Returns a safe cell to choose on the Minesweeper board.
        The move must be known to be safe, and not already a move
        that has been made.

        This function may use the knowledge in self.mines, self.safes
        and self.moves_made, but should not modify any of those values.
        """
        raise NotImplementedError

    def make_random_move(self):
        """
        무작위의 이동 반환 
        이동할 수 있는 셀이 없는 경우 = None반환

        Returns a move to make on the Minesweeper board.
        Should choose randomly among cells that:
            1) have not already been chosen, and (이미 수행된 이동이 아니어야함)
            2) are not known to be mines (지뢰라고 이미 알고 있는 셀은 아니어야함)
        """
        raise NotImplementedError
