
import styled from 'styled-components';

const Div = styled.div`
	::-webkit-scrollbar-button {
		background-image:url('');
		background-repeat:no-repeat;
		width:5px;
		height:0px
	}

	::-webkit-scrollbar-track {
		background-color:#ecedee
	}
	::-webkit-scrollbar-thumb {
		-webkit-border-radius: 0px;
		border-radius: 0px;
		background-color:#6dc0c8;
	}
	::-webkit-scrollbar-thumb:hover{
		background-color:#56999f;
	}

	::-webkit-resizer{
		background-image:url('');
		background-repeat:no-repeat;
		width:4px;
		height:0px
	}	

	::-webkit-scrollbar{
		width: 4px;
	}
	&.main{
		height: 70vh;
		background-color: rgba(255, 255, 255, 0.95) !important;
	}
	&.flex-column{
		display : flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	&.left{
		width : 20%;
		overflow: scroll;
		height: 65vh;
		overflow-x: hidden;
	}
	&.middle{
		width: 20%;
		overflow: scroll;
		height: 65vh;
		overflow-x: hidden;
	}
	&.right{
		width: 60%;
	}
	&.flex{
		padding : 1% 3%;
		width:100%;
		display : flex;
		flex-direction : row;
	}
	&.flex-center{
		justify-content:space-between;
	}
	&.flex-left{
		justify-content: flex-start;
	}
	&.flex-right{
		justify-content: flex-end;
	}
	&.markdown{
		width: 95%;
		float: right;
	}
`;

export default Div;
