<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import Line from "./Line.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";

  let count, index, offset, progress;
  let width, height;

  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };

  $: projection = geoMercator().fitSize([width, height], geoJsonToFit);

        // Function to convert hour value to AM/PM format
        function hourToAmPm(hour) {
            const period = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
            return formattedHour + ' ' + period;
        }


</script>


<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}

  bind:count
  bind:index
  bind:offset
  bind:progress
>
  
  <div class="background"
   slot="background"
   bind:clientWidth={width}
   bind:clientHeight={height}
   >
  </div>

    <div class="foreground" slot="foreground" >
      
      <div class="progress-bars">
        <p>current section: <strong>{index + 1}/{count}</strong></p>
        <progress value={count ? (index + 1) / count : 0} />
        <p>offset in current section: <strong>{parseFloat(offset).toFixed(2)}/1</strong></p>
        <progress value={offset || 0} />
    
        </div>
      <section style="height: 400px;">
        <div class="header">
          <div class="header-content">
            <div class="header-text">
              <h1>New York - City Transit Data</h1>
              <p>
                The bustling metropolis of New York, often dubbed the 'City that never sleeps,' boasts a subway system that operates around the clock. This analysis focuses on the expansive metropolitan area, encompassing the five vibrant boroughs of Bronx, Brooklyn, Manhattan, Queens, and Staten Island. This vast community relies extensively on the efficiency and accessibility of public transportation networks, such as the iconic subway system, to sustain its vibrancy and fuel its economic growth and prosperity.
              </p>
            </div>
            <div class="header-image">
              <!-- <img src="/src/data/img/statue_of_liberty.png" alt="Image description"> -->
              <img src="https://raw.githubusercontent.com/SeanIsayama/nysubways/main/src/data/img/statue_of_liberty.png" alt="Image description">

            </div>
          </div>
        </div>
      </section>
      <section style="height: 1600px;">
        <div class="fixed-graph">
          <Graph {index} {offset}/>
        </div>
      </section>
      <section>index</section>
      <section>section 3.</section>
      <section>section 4
        <Map bind:geoJsonToFit {index} />
      </section>
      <section>section 5
        <Line {index}/>
      </section>

      
  </div>

</Scroller>

<style>
   .header {
  font-family: Nunito, sans-serif; 
  background-color: #f0f0f0;
  padding: 20px;
  border-bottom: 2px solid #ccc;
  }

  .header-content {
    display: flex; /* Use flexbox layout */
    align-items: center; /* Center items vertically */
    justify-content: space-between; /* Separate text and image */
  }

  .header-text {
    flex: 1; /* Allow text to take up remaining space */
    margin-right: 20px; /* Add some space between text and image */
  }

  .header-image img {
    max-width: 40%; /* Ensure image doesn't exceed container width */
    float: right;
    height: auto; /* Maintain aspect ratio */
  }

  .current-time {
    font-family: Arial, sans-serif; /* Change the font family as desired */
    font-size: 16px; /* Adjust the font size */
    font-weight: bold; /* Adjust the font weight */
    color: #333; /* Adjust the font color */
  }
  .map {
    
    z-index: 2; /* Set a higher z-index for the map */
    /* Other styles */
  }
  .foreground {
    width: 100%;
    position: relative;
    /* padding-top: 500px;  */
    z-index: 0; 
    }

  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    outline: rgb(255, 255, 255) solid 3px;
    z-index: 1;

  }


  section {
    height: 100vh;
    width: 91.5%;
    position: relative; /* Needed for absolute positioning of children */
    background-color: white; /* Boxes to white */
    outline: black solid 3px;
    color: black;
    padding-left: 60px;
    padding-right: 60px;
  }

  .hour-label {
    font-weight: bold;
    font-family: Arial, sans-serif;
    position: absolute;
    left: -60px; 
    top: 0%;
    transform: translateY(-50%); /* Center vertically */
    padding: 0 10px; /* Padding for the label */
  }

  .stations-container {
  position: absolute;
  top: 500; /* Align with the top of the foreground */
  left: -60; /* Align with the left edge of the foreground */
  width: 100%; /* Take up the full width of the foreground */
  height: calc(100% - 500px); /* Take up the full height of the foreground */
  /* z-index: 10; Ensure it's above the sections */
  /* pointer-events: none; Allows clicks to pass through */
}

.station {
  position: absolute;
  width: 2px; /* Width of the vertical line */
  height: calc(100% - 500px); /* Adjust the height to start just below the hour labels */
  background-color: black; /* Color of the line */
  /* z-index: 5; Below the labels but above the sections */
}

.station-label {
  position: absolute;
  top: 0; /* Position at the top of the stations container */
  background-color: white; /* Background of the labels for readability */
  padding: 0 5px;
  /* z-index: 15; Above everything */
}

.station-line {
  position: absolute;
  top: 0; /* Start at the top of the stations container */
  bottom: 0; /* Stretch to the bottom of the stations container */
  background-color: black; /* Color of the line */
  /* z-index: 20; */
}
.progress-bars {
    position: fixed;
    top: 0px;
    right: 20px; /* Adjust the right positioning as needed */
    z-index: 999;
  }

  .fixed-graph {
    position: sticky;
    top: 50px; /* Adjust top positioning as needed */
    z-index: 999; /* Ensure the graph remains above other content */
  }


</style>
