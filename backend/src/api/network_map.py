from fastapi import APIRouter, Depends
from typing import Dict, List, Any
from ..core.security import get_current_user
from ..services.network_graph import network_graph_service

router = APIRouter(prefix="/network", tags=["Network Analysis"])


@router.get("/map")
async def get_network_map(current_user: dict = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Get bot network visualization data.
    Returns graph structure with nodes and edges for network mapping.

    Frontend Integration:
    ```javascript
    const response = await fetch('http://localhost:8000/network/map', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const networkData = await response.json();

    // networkData contains:
    // - nodes: array of {id, label, type, risk_score, ...}
    // - edges: array of {source, target, relationship}
    // - clusters: array of identified bot networks

    // Use this data with D3.js, Cytoscape.js, or similar graph library
    console.log('Nodes:', networkData.nodes.length);
    console.log('Edges:', networkData.edges.length);
    console.log('Clusters:', networkData.clusters);
    ```

    In production, this would query Neo4j graph database for real bot network relationships.
    Currently returns sample data for demonstration.
    """
    graph_data = network_graph_service.generate_sample_graph()
    return graph_data


@router.get("/stats")
async def get_network_stats(current_user: dict = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Get network statistics summary.

    Frontend Integration:
    ```javascript
    const response = await fetch('http://localhost:8000/network/stats', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const stats = await response.json();
    console.log('Total Networks:', stats.total_networks);
    console.log('Suspicious Accounts:', stats.suspicious_accounts);
    ```
    """
    return {
        "total_networks": 32,
        "suspicious_accounts": 1834,
        "active_campaigns": 12,
        "high_risk_clusters": 8,
        "analyzed_posts": 45200,
        "detection_rate": 0.87
    }
