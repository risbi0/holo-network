import { useEffect } from "react";
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
    staticGraph: true,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    highlightOpacity: 0.3,
    node: {
      size: 150,
      highlightStrokeColor: "blue",
      renderLabel: false
    },
    link: {
      color: '#999',
      highlightColor: "#00F",
      strokeWidth: "0.2",
      opacity: 0.5
    },
    width: 1000,
    height: 1000,
    d3: {
      linkLength: 200
    }
  };

  useEffect(() => {
    const checkElements = () => {
      const nodeElements = document.querySelectorAll('.node');
      if (nodeElements.length > 0) {
        nodeElements.forEach(b=>b.setAttribute('clip-path', 'circle(50% at 50% 50%)'))
      } else {
        setTimeout(checkElements, 100);
      }
    };
    checkElements();
  }, []);

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
