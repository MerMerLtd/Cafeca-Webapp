export const Collections = {
    collectionItems: [],
    addItem: function (item) {
        let newItem = {...item,
            withSet: false,
            };
        if(this.collectionItems.findIndex(i => i.id === newItem.id) !== -1){
            return;
        }
        this.collectionItems.push(newItem);
        return newItem;
    },
    deleteItem: function (id){   
        const index = this.collectionItems.findIndex(item => item.id === id);
        this.collectionItems.splice(index, 1);
    },
}

// export const List = {
//     // can be use on Collection and Cart
//     collections:[],
//     cartItems:[],
//     addItem: function (list, item){
//         let index, newItem;
//         switch (list){
//             case "cart":
//                 newItem = {...item, 
//                     count: 1, 
//                     id: item.withSet
//                         ? item.id + "set"
//                         : item.id,
//                     };
//                 index = this.cartItems.findIndex(i => i.id === newItem.id);
//                 index !== -1 
//                 ? this.cartItems[index].count++
//                 : this.cartItems.push(newItem);
//                 return newItem;
//             case "collections":
//                 newItem = {...item};
//                 index = this.collections.findIndex(i => i.id === newItem.id);
//                 index !== -1
//                 ? null
//                 : this.collections.push(newItem);
//                 return newItem;
//             default:
//                 break;
//         }

//         this.persistData();
//     },
//     deleteItem: function (list, id){
//         const items = list === "cart" ? this.cartItems : this.collections;
//         const index = items.findIndex(item => item.id ===id);
//         items.splice(index, 1);

//         this.persistData();
//     },
//     updateCount: function (type){
//        const newCount = type === "dec" ? this.cartItems.count -1 : this.cartItems.count + 1;
//        this.count = newCount;
//     },

//     // updateCount: function (id, newCount){
//     //     this.items.findIndex(item => item.id ===id).count = newCount;
//     // },

//     isItemExist: function (list, id){
//         const items = list === "cart" ? this.cartItems : this.collections;
//         return items.findIndex(item => item.id === id) !== -1;
//     },
//     getItemsNums: function (){
//         return this.items.length;
//     },
//     persistData: function (list) {
//         // localStorage.setItem("Collections", JSON.stringify(this.items));
//         localStorage.setItem(list, JSON.stringify(this.items));
//     },
//     readStorage: function (list){
//         // const storage = JSON.parse(localStorage.getItem("Collections"));
//         const storage = JSON.parse(localStorage.getItem("list"));

//         const items = list === "cart" ? this.cartItems : this.collections;
//         if (storage) items = storage;
//     }
// }

// // export default Collections;