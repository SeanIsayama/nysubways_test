<script>
  import { onMount } from 'svelte';
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import { transition } from 'd3-transition';
  export let index;
  export let offset;

  let data = Array.from({ length: 800 }, (_, i) => i); // Generate data for 800 circles

  function calculateRadius() {
    return 5
  }

  let text;

  function createCircles() {
    const svg = select('svg');
    
    // Remove existing circles
    svg.selectAll('circle').remove();

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => i % 40 * 20 + 10) // Adjust x position based on the number of columns
      .attr('cy', (_, i) => Math.floor(i / 40) * 20 + 10) // Adjust y position based on the number of columns
      .attr('r', 0) // Set initial radius to 0 for fading in effect
      // .attr('fill', 'blue')
      .attr('fill', (_, i) => (offset > 0.3) ? (i < data.length / 2 ? 'red' : 'blue') : 'blue')
      .attr('opacity', 0) // Set initial opacity to 0 for fading in effect
      .transition() // Apply transition for fading in effect
      .duration(500) // Duration of the transition
      .delay((_, i) => i * 5) // Delay each circle's appearance for a smooth animation
      .attr('r', calculateRadius) // Animate radius
      .attr('opacity', 0.7); // Animate opacity

      text = svg.append('text')
        .attr('x', 850) // Adjust x position as needed
        .attr('y', 50) // Adjust y position as needed
        .attr('fill', 'black')
        .style('opacity', 0);
      text.append('tspan')
          .text('As of the end of 2021, the city of New York has a population of a');
      text.append('tspan')
          .attr('x', 850)
          .attr('y', 70) // Move down 20 units for the second line
          .text('whopping 8.468 million.');
      text.transition()
        .duration(1000) // Adjust the duration as needed
        .style('opacity', 1); // Change opacity to 1 for fade-in effect
  }

  function updateColor(color) {
    select('svg').selectAll('circle')
      .filter((_, i) => i < 300)
      .transition() // Apply transition for color change
      .duration(500) // Duration of the transition
      .attr('fill', color);
    text.append('tspan')
          .attr('x', 850)
          .attr('y', 90) // Move down 20 units for the third line
          .text('Of all people who commuted to work in New York City in 2021,');
    text.append('tspan')
          .attr('x', 850)
          .attr('y', 110) // Move down 20 units for the third line
          .text(' 32% use the subway.');
          
    text.selectAll('tspan')
      .filter((_, i) => i >= 2) // Filter out existing lines
      .style('opacity', 0) // Set initial opacity to 0 for fading in effect
      .transition() // Apply transition for fading in effect
      .duration(1000) // Duration of the transition
      .style('opacity', 1); // Change opacity to 1 for fade-in effect
  
  }

  let circleMade = false;
  $: if (index === 1 && offset > 0.2 && !circleMade) {
            createCircles();
            circleMade = true;
        } 
  
  let circleUpdate = false;
  $: if (index === 1 && offset > 0.6 && !circleUpdate) {
            updateColor("red")
            circleUpdate = true;
        } 
</script>

<svg width="100%" height="600"></svg>

<style>
  svg {
    background-color: #f0f0f0;
    position: "absolute"
  }
</style>
