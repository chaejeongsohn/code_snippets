"""
Tic Tac Toe Player
"""

import math

X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    count_non_empty = sum(len(row) - row.count(EMPTY) for row in board)
    print("count_non_empty = ", count_non_empty)

    if count_non_empty == 0 or count_non_empty % 2 == 0:
        return X
    else:
        return O


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    possible_actions = set(
        (i, j) for i in range(3) for j in range(3) if board[i][j] == EMPTY
    )
    print("possible_actions = ", possible_actions)

    return possible_actions


def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    # 가능한 액션인지 확인
    if action not in actions(board):
        raise NotImplementedError

    # 보드 복사본 생성
    import copy

    board_copy = copy.deepcopy(board)

    # action반영
    board_copy[action[0]][action[1]] = player(board_copy)

    return board_copy


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """
    # 가로 또는 세로 빙고
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] and board[i][0] != EMPTY:
            return board[i][0]
        if board[0][i] == board[1][i] == board[2][i] and board[0][i] != EMPTY:
            return board[0][i]

    # 대각선 빙고
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != EMPTY:
        return board[1][1]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != EMPTY:
        return board[1][1]

    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    # 게임이 종료된 경우
    if winner(board) is not EMPTY or actions(board) == set():
        return True

    # 게임이 진행중이거나 무승부로 종료된 경우
    return False


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    winner_value = winner(board)

    if winner_value == X:
        return 1
    elif winner_value == O:
        return -1
    else:
        return 0


def minimax(board):
    """
    Returns the optimal action for the current player on the board.
    """
    if terminal(board):
        return None
    Max = float("-inf")
    Min = float("inf")

    if player(board) == X:
        return Max_Value(board, Max, Min)[1]
    else:
        return Min_Value(board, Max, Min)[1]


def Max_Value(board, Max, Min):
    move = None
    if terminal(board):
        return [utility(board), None]
    v = float("-inf")
    for action in actions(board):
        test = Min_Value(result(board, action), Max, Min)[0]
        Max = max(Max, test)
        if test > v:
            v = test
            move = action
        if Max >= Min:
            break
    return [v, move]


def Min_Value(board, Max, Min):
    move = None
    if terminal(board):
        return [utility(board), None]
    v = float("inf")
    for action in actions(board):
        test = Max_Value(result(board, action), Max, Min)[0]
        Min = min(Min, test)
        if test < v:
            v = test
            move = action
        if Max >= Min:
            break
    return [v, move]
