```js
import React from "react";

const gifts = [
  {
    name: "Ayiqcha",
    stars: 15,
    price: "4 000 so'm",
    image:
      "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Yurakcha",
    stars: 15,
    price: "4 000 so'm",
    image:
      "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Sovg'a",
    stars: 25,
    price: "6 500 so'm",
    image:
      "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Atirgul",
    stars: 50,
    price: "12 000 so'm",
    image:
      "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
];

function Gift() {
  function buyGift(gift) {
    alert(gift.name + " tanlandi!\nNarxi: " + gift.price);
  }

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        padding: "20px 15px 100px",
        boxSizing: "border-box",
        background: "#f5f5f5",
      },
    },

    React.createElement(
      "h1",
      {
        style: {
          textAlign: "center",
          fontSize: "28px",
          margin: "5px 0 22px",
          color: "#222",
        },
      },
      "🎁 Gift"
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "14px",
          maxWidth: "600px",
          margin: "0 auto",
        },
      },

      gifts.map(function (gift, index) {
        return React.createElement(
          "div",
          {
            key: index,
            style: {
              background: "#fff",
              borderRadius: "20px",
              padding: "12px",
              boxSizing: "border-box",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
            },
          },

          React.createElement(
            "div",
            {
              style: {
                width: "100%",
                height: "190px",
                borderRadius: "16px",
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              },
            },

            React.createElement("img", {
              src: gift.image,
              alt: gift.name,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              },
            })
          ),

          React.createElement(
            "h2",
            {
              style: {
                fontSize: "18px",
                margin: "12px 2px 7px",
                color: "#222",
              },
            },
            gift.name
          ),

          React.createElement(
            "div",
            {
              style: {
                fontSize: "14px",
                color: "#666",
                marginBottom: "10px",
              },
            },
            "⭐ " + gift.stars + " Stars"
          ),

          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              },
            },

            React.createElement(
              "strong",
              {
                style: {
                  fontSize: "16px",
                  color: "#222",
                },
              },
              gift.price
            ),

            React.createElement(
              "button",
              {
                onClick: function () {
                  buyGift(gift);
                },
                style: {
                  width: "100%",
                  border: "none",
                  borderRadius: "12px",
                  padding: "11px",
                  background: "#2481cc",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                },
              },
              "Sotib olish"
            )
          )
        );
      })
    )
  );
}

export default Gift;
```
