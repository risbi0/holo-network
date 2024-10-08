/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';
import { links } from './links';
import { nodes } from './nodes';
import { connections } from './connections';

const App = () => {
  const svgRef = useRef();
  
  const data = {
    nodes: nodes,
    links: links 
  };

  const nodeSize = 30;
  const defaultStrokeColor = '#999';
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.name).distance(50))
      //.force('charge', d3.forceManyBody().strength(-200))
      //.force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
      .on('tick', ticked);

    function ticked() {
      link
        .attr('x1', l => l.source.x)
        .attr('y1', l => l.source.y)
        .attr('x2', l => l.target.x)
        .attr('y2', l => l.target.y);
      node
        .attr('x', n => n.x - nodeSize / 2)
        .attr('y', n => n.y - nodeSize / 2);
    }

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', 0.2)
      .attr('stroke', defaultStrokeColor);

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(data.nodes)
      .enter().append('svg:image')
      .attr('width', nodeSize)
      .attr('height', nodeSize)
      .attr('clip-path', 'circle(50% at 50% 50%)')
      .attr('xlink:href', n => n.img);

    // too laggy
    // drag events
    /* node.call(d3.drag()
      .on('start', dragStart)
      .on('drag', dragging)
      .on('end', dragEnd)); */

    function dragStart(e) {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      e.subject.fx = e.subject.x;
      e.subject.fy = e.subject.y;
    }

    function dragging(e) {
      e.subject.fx = e.x;
      e.subject.fy = e.y;
    }

    function dragEnd(e) {
      if (!e.active) simulation.alphaTarget(0);
      e.subject.fx = null;
      e.subject.fy = null;
    }

    // highlight hovered node and its links
    node.on('mouseover', (_, selected_node) => {
      link.style('stroke', (_, i) => connections[selected_node.name]['links'][i] ? '#89DBEB' : defaultStrokeColor);
      link.style('opacity', (_, i) => connections[selected_node.name]['links'][i] ? 1 : 0.3);
      node.style('filter', (_, i) => connections[selected_node.name]['nodes'][i] ? null : 'brightness(40%)');
    });

    // reset styles
    node.on('mouseout', () => {
      link.style('stroke', defaultStrokeColor);
      link.style('opacity', 1);
      node.style('filter', null);
    });
  }, [data]);

  return <svg ref={svgRef} id='main'></svg>;
};

export default App;
