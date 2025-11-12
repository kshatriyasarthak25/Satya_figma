import random
from typing import Dict, List


class NetworkGraphService:
    """
    Placeholder service for network graph generation.
    In production, this would query Neo4j for bot network relationships.
    """

    def generate_sample_graph(self) -> Dict[str, List]:
        """
        Generate sample network graph data.
        Returns: {"nodes": [...], "edges": [...]}
        """

        # Generate sample bot accounts
        nodes = []
        for i in range(1, 16):
            node_type = random.choice(["bot_account", "suspicious_account", "normal_account"])
            nodes.append({
                "id": f"user_{i}",
                "label": f"@bot_account_{i}" if "bot" in node_type else f"@user_{i}",
                "type": node_type,
                "follower_count": random.randint(100, 50000),
                "risk_score": round(random.uniform(0.2, 0.95), 2)
            })

        # Generate sample posts
        for i in range(1, 11):
            nodes.append({
                "id": f"post_{i}",
                "label": f"Post #{i}",
                "type": "post",
                "engagement": random.randint(500, 100000),
                "sentiment": random.choice(["negative", "polarizing", "misleading"])
            })

        # Generate connections (edges)
        edges = []
        for i in range(1, 16):
            # Each user creates/shares posts
            for _ in range(random.randint(1, 3)):
                post_id = random.randint(1, 10)
                edges.append({
                    "source": f"user_{i}",
                    "target": f"post_{post_id}",
                    "relationship": random.choice(["created", "shared", "amplified"])
                })

        # Add some user-to-user connections (bot networks)
        for i in range(1, 16):
            if random.random() > 0.5:
                target = random.randint(1, 15)
                if target != i:
                    edges.append({
                        "source": f"user_{i}",
                        "target": f"user_{target}",
                        "relationship": "coordinated_with"
                    })

        return {
            "nodes": nodes,
            "edges": edges,
            "clusters": [
                {
                    "id": "cluster_1",
                    "name": "Bot Network Alpha",
                    "member_count": 8,
                    "risk_level": "high"
                },
                {
                    "id": "cluster_2",
                    "name": "Propaganda Group Beta",
                    "member_count": 5,
                    "risk_level": "critical"
                }
            ]
        }


# Singleton instance
network_graph_service = NetworkGraphService()
