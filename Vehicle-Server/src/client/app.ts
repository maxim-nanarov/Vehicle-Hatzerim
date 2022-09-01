// // import { Sock } from "./shared/Sock";
// // import { SockComponent } from "./shared/SockComponent";

// let sockParentDiv: HTMLElement;
// let socksList: Sock[] = [];

// function renderData() {
//   socksList.forEach((item) => {
//     let sockComponent: SockComponent = new SockComponent(item, sockParentDiv);
//     sockComponent.createSockElement();
//   });
// }

// async function onload() {
//   await fetch("/socks").then((res) =>
//     res.json().then((data) => {
//       socksList.push(...data);
//     })
//   );
//   sockParentDiv = document.getElementById("socksList") as HTMLElement;
//   renderData();
// }

// console.log(socksList);

// window.addEventListener("load", () => {
//   onload();
// });

// //@ts-ignore
// export async function remove(id: any) {
//   await fetch(`/remove`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });
//   window.location.reload();
// }

// //@ts-ignore
// export async function edit(id) {
//   let socksList2: any[] = [];
//   await fetch("/socks").then((res) =>
//     res.json().then((data) => {
//       socksList2 = data;
//     })
//   );
//   if (socksList2.length !== 0) {
//     socksList2.forEach((sock) => {
//       if (sock.sock_id === id) {
//         window.location.href = `${origin}/edit_sock?id=${sock.sock_id}`;
//       }
//     });
//   }
// }
