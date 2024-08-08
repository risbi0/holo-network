import { Graph } from "react-d3-graph";
import { nodes } from './nodes';
import { links } from './links';
import './App.css';

function App() {
  const data = {
    nodes: nodes,
    links: links,
  };

  const myConfig = {
    //focusedNodeId: "Gawr Gura",
    color: "#eeeeee",
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    highlightOpacity: 0.3,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
      renderLabel: false
    },
    link: {
      color: '#555',
      highlightColor: "#000",
      strokeWidth: "0.1",
      opacity: 0.8
    },
    width: 1000,
    height: 1000,
    d3: {
      linkLength: 200
    }
  };

  return (
    <>
      <Graph
        id="graph-id"
        data={data}
        config={myConfig}
      />
      <div id='desc'>
        <p>Mostly from livestreams</p>
        <p>Unplanned collabs (i.e. in Minecraft) and totsumachi calls don&apos;t count</p>
      </div>
    </>
  )
}

export default App
