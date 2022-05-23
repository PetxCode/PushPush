// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// 	product: [],
// 	cart: [],
// };

// const build = createSlice({
// 	name: "shop_reducer",
// 	initialState,
// 	reducers: {
// 		addProduct: (state, { payload }) => {
// 			state.product = payload;
// 		},
// 		addToCart: (state, { payload }) => {
// 			const check = state.cart.indexOf((el) => el.id === payload.id);

// 			if (cart >= 0) {
// 				state.cart[check].QTY += 1;
// 			} else {
// 				state.cart.push({ ...payload, QTY: 1 });
// 			}

// 			state.product = payload;
// 		},

// 		increaseCount: (state, { payload }) => {
// 			const check = state.cart.indexOf((el) => el.el.id === payload.id);
// 			let checkValue = state.cart[check].QTY;

// 			if (checkValue > 1) {
// 				checkValue -= 1;
// 			} else if (checkValue === 1) {
// 				state.cart = state.cart.filter((el) => el.id !== payload.id);
// 			}
// 		},

// 		remover: (state, { payload }) => {
// 			state.cart = state.cart.filter((el) => el.id !== payload.id);
// 		},

// 		total: (state, { payload }) => {
// 			let { totalProducts, totalCost } = state.cart.reduce(
// 				(mainProd, mainCost) => {
// 					const { price, QTY } = mainCost;

// 					const bestCost = price * QTY;

// 					mainPduct.totalCost += QTY;
// 					mainPduct.totalProducts += bestCost;

// 					return mainProd;
// 				},
// 				{ totalProducts: 0, totalCost: 0 }
// 			);
// 			state.getTotalProduct = totalProducts;
// 			state.getTotalCost = totalCost;
// 		},
// 	},
// });

// export const {} = build.actions;

// export default build.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	product: [],
	cart: [],
};

const build = createSlice({
	name: "my_store",
	initialState,
	reducers: {
		addProduct: (state, { payload }) => {
			state.product = payload;
		},

		removeProduct: (state, { payload }) => {
			state.cart = state.cart.filter((el) => el.id !== payload.id);
		},

		addToCart: (state, { payload }) => {
			const check = state.cart.indexOf((el) => el.id === payload.id);
			if (check >= 0) {
				state.cart[check].QTY += 1;
			} else {
				state.cart.push({ ...payload, QTY: 1 });
			}
		},

		makeCount: (state, { payload }) => {
			const check = state.cart.indexOf((el) => el.id === payload.id);
			const checkValue = state.cart[check].QTY;

			if (checkValue > 1) {
				checkValue -= 1;
			} else if (checkValue === 1) {
				state.cart = state.cart.filter((el) => el.id !== payload.id);
			}
		},

        totalSales: (state, { payload }) => {
            let {totalProducts, totalCost} = state.cart.reduce((mainProd, mainCost)=> {

            },{totalProducts:0, totalCost:0})

            state.getTotalCost = mainCost;
            state.getTotalCost = mainProd;
        }
	},
});

export const {} = build.actions;

export default build.reducer;
