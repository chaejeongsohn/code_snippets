from collections import deque

# Define a graph as an adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

def bfs(graph, start):
    visited = set()  # To keep track of visited nodes
    queue = deque()  # Create a queue for BFS

    visited.add(start)  # Mark the start node as visited
    queue.append(start)  # Add the start node to the queue

    while queue:
        node = queue.popleft()  # Dequeue a node from the front of the queue
        print(node, end=' ')  # Process the node (you can replace this with your own logic)

        # Enqueue all unvisited neighbors of the current node
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Start BFS from a specific node, e.g., 'A'
start_node = 'A'
print("BFS starting from node", start_node)
bfs(graph, start_node)
