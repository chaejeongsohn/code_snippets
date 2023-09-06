"""
Tic Tac Toe Player
"""

import math
import copy

X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    count = 0
    for row in board:
        for box in row:
            if box is not None:
                count += 1
    
    # # 게임이 계속 진행중인지 확인
    # if terminal(board) == None:
    #     return None

    if count == 0 or count % 2 == 0:
        return X
    else:
        return O


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    result_set = set()

    # 비어있는 모든 좌표 탐색
    row_count = len(board)
    for row_num in range(row_count):
        target_row = board[row_num]
        for index, value in enumerate(target_row):
            if value == EMPTY:
                possible_action = (row_num, index)
                result_set.add(possible_action)
                
    return result_set
    # # 게임이 계속 진행중인지 확인
    # if terminal(board) == None:
    #     return result_set
    # else:
    #     return None


def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    # 현재 플레이어 확인
    now_player = player(board)

    # 현재 가능한 모든 액션 
    possible_set = actions(board)

    # 해당 action이 가능하지 않은 경우, 예외 발생
    if action not in possible_set:
        raise NotImplementedError
    
    # 보드 복사본 생성
    board_copy = copy.deepcopy(board)

    # action으로 보드 업데이트
    action_i = action[0]
    action_j = action[1]

    board_copy[action_i][action_j] = now_player
    # print("---------------------")
    # for row in board_copy:
    #     print(row, "\n")
    # print("---------------------")
    return board_copy


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """
    # 가로로 빙고
    for row in board:
        first_box = row[0]
        if any(box != first_box for box in row):
            pass
        else:
            return first_box

    # 세로로 빙고
    row_count = len(board)
    col_len = len(board[0])
    for col_index in range(col_len):
        first_box = board[0][col_index]
        if any(board[row_index][col_index] != first_box for row_index in range(row_count)):
            pass
        else:
            return first_box

    # 대각선 빙고
    # 3*3 임을 가정함
    center_box = board[1][1]

    if board[0][0] == center_box and board[row_count-1][col_len-1] == center_box:
        return center_box
    
    if board[0][col_len-1] == center_box and board[row_count-1][0] == center_box:
        return center_box

    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    # 승자가 있는 경우
    if winner(board) is not None:
        return True
    
    # 승리한 사람이 없이 모든 셀이 채워진 경우
    all_not_none = True
    for row in board:
        for box in row:
            if box is None:
                all_not_none = False
                break

    if all_not_none:
        return True
    
    # 게임이 진행중이거나 무승부로 종료된 경우
    return None


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    # 승자가 누구인지 확인
    winner_user = winner(board)
    if winner_user == X:
        return 1
    elif winner_user == O:
        return -1
    else:
        return 0


# 내가 짠 코드는 AI가 항상 최적의 수를 두지 않음
# def minimax(board):
#     """
#     Returns the optimal action for the current player on the board.
#     """
#     # 게임 끝났으면 리턴 
#     if terminal(board):
#         return utility(board)
    
#     # 현재 플레이어 확인
#     now_player = player(board)

#     # 재귀를 이용한 예측
#     if now_player == X:
#         return max_value(board)[1]
#     else:
#         return min_value(board)[1]


# def max_value(board):
#     if terminal(board):
#         return [utility(board), None]
#     move = None
#     v = -math.inf  # 음의 무한대

#     # 가능한 동작마다
#     for action in actions(board):
#         predict = min_value(result(board, action))[0]
#         v = max(v, predict)
#         if predict > v:
#             v = predict
#             move = action
#             if v == 1:
#                 return [v, move]
#     return [v, move]


# def min_value(board):
#     if terminal(board):
#         return [utility(board), None]
#     move = None
#     v = math.inf  # 양의 무한대

#     # 가능한 동작마다
#     for action in actions(board):
#         predict = max_value(result(board, action))[0]
#         v = max(v, predict)
#         if predict < v:
#             v = predict
#             move = action
#             if v == -1:
#                 return [v, move]
            
#     return [v, move]



# minimax 함수는 아래 깃허브 참고함
# https://github.com/SpideySheoran/CS50-AI-Tic-Tac-Toe/blob/master/tictactoe.py

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
    v = float('-inf')
    for action in actions(board):
        # print(" >>> max action: ", action)
        test = Min_Value(result(board, action), Max, Min)[0]
        Max = max(Max, test)
        if test > v:
            v = test
            move = action
            # print("max move: ",test, move)
        if Max >= Min:
            break
    return [v, move]


def Min_Value(board, Max, Min):
    move = None
    if terminal(board):
        return [utility(board), None]
    v = float('inf')
    for action in actions(board):
        # print(" >>> min action: ", action)
        test = Max_Value(result(board, action), Max, Min)[0]
        Min = min(Min, test)
        if test < v:
            v = test
            move = action
            # print("min move: ",test, move)
        if Max >= Min:
            break
    return [v, move]

    


