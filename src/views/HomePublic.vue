<template>
	<body>
		<table width="100%" align=center>
			<tr>
				<td>
					<br>
					<br>
					<router-link to="/quotation"><button>Check here!</button></router-link>
					<br>
					<br>			
				</td>
			</tr>
		</table>
	</body>
</template>

<script>
export default {
	name: "HomePublic",

	data: function () {
		return {
			user: undefined
		};
	},

};
</script>

<style >
	table {
		background-color: #141826;
		background-image: url("../assets/Home.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		padding: 0px;
		margin: 0%;
		/*@import url('https://typodermicfonts.com/coolvetica/');
		font-family: 'coolvetica';*/
		font-size: 50px;
		color: aliceblue;
	}
	body{
		padding: 0px;
		margin: 0%;
	}
	a{
		font-size: 50px;
		color: aliceblue;
	}
	button{
		color: #e9f3f2;
		background: #268c79;
		border-radius: 6px;
		width: 9%;
		padding: 15px 30px 15px 30px;
		margin: 1px;
		text-align: center;
		font-size: 16px;
	}
	button:hover{
		color: #141826;
		background: #35f2bd;
	}
</style>
