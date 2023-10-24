// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user", //store ka name 
//   initialState: {
//     name: "john",
//     email: "john@email.com",
//   },
//   reducers: {
//     //this update , remove written here are actions
//     update: (state, action) => {
//       statename = action.payload.name;
//       stateemail = action.payload.email;
//     },
//     remove: (state) => {
//       state = null;
//     },
//     addHelloToName : (state, action) =>{
//       statename = "Hello " + action.payload.name
//     }
//   },
// });

// export const { update, remove } = userSlice.actions;

// export default userSlice.reducer;








import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user", //store ka name 
    initialState: {
    author: JSON.parse(localStorage.getItem("user")) || null,
    isFetching:"false",
    error:false,
    },
    reducers: {
      
      LOGIN_START: (state, action) => {
      
        state.isFetching = true
      },
      LOGIN_SUCCESS: (state, action) => {
      
        state.author = action.payload;
        state.isFetching = false;
        localStorage.setItem("user",JSON.stringify(state.author));

      },
      LOGIN_FAILURE: (state, action) => {
      
        state.isFetching = false;
        state.error = true
      },
      LOGOUT: (state, action) => {
       
        state.author = null;
        state.isFetching = false
        state.error = false;
        localStorage.removeItem("user");


        // localStorage.removeItem("access_token");
        
      },
      UPDATE:(state,action)=>{
        state.author = action.payload;
        localStorage.setItem("user",JSON.stringify(state.author));
      }
    
    },
  });

  export const { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT ,UPDATE} = userSlice.actions;

export default userSlice.reducer;