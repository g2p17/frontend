<template>  	
<div class="Footer">
	<head>
		<link
		rel="stylesheet"
		href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
		integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
		crossorigin="anonymous"
		/>
		<h2>®MisionTic 2021 - C4P17G2 Course</h2>
	</head>
	<footer class="footer">
		<nav>
			<ul>
				<li height="350" class="logos">
					<img
					alt="ParkingWeb logo"
					style="vertical-align: middle; margin: 20px 10px"
					align="left"
					src="../assets/logo.png"
					width="252"
					height="50"
					/>
				</li>
				<li>
					<p>
					Find us! <br /><i
						class="fas fa-map-marker-alt"
						style="
						font-size: 30px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					Cra 45, Bogotá <br /><i
						class="fas fa-phone-square-alt"
						style="
						font-size: 30px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					601-6952529 <br /><i
						class="fas fa-envelope-square"
						style="
						font-size: 30px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					users@parkingweb.com
					</p>
				</li>
				<li>
					<p>
					Follow us! <br /><i
						class="fab fa-facebook-square"
						style="
						font-size: 36px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					ParkingWeb <br /><i
						class="fab fa-instagram-square"
						style="
						font-size: 36px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					@ParkingWeb <br /><i
						class="fab fa-twitter-square"
						style="
						font-size: 36px;
						color: #35f2bd;
						text-shadow: 2px 2px 4px #000000;
						"
					></i>
					@ParkingWeb
					</p>
				</li>
			</ul>
		</nav>
	</footer>
</div>
</template>

<script>
export default {
  name: "FooterParking",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 20px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-flex;
  padding: 3%;
  margin: 0 5px;
  align-content: center;
  text-align: left;
  color: #141826;
  font-size: 22px;
}
a {
  color: #42b983;
}
.logos {
  padding: 0% 0% 0% 0%;
}
</style>