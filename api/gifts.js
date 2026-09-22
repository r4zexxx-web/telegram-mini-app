```js
import React, { useState } from "react";

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
  const [selectedGift, setSelectedGift] = useState(null);
  const [sending, setSending] = useState(false);

  function openPayment(gift) {
    setSelectedGift(gift);
  }

  function closePayment() {
    setSelectedGift(null);
  }

  async function paymentDone() {
    if (!selectedGift) return;

    setSending(true);

    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    const order = {
      giftName: selectedGift.name,
      price: selectedGift.price,
      stars: selectedGift.stars,
      userId: user?.id || "",
      username: user?.username || "",
      firstName: user?.first_name || "",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/gift-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Server xatosi");
      }

      alert("✅ Buyurtma yuborildi!");

      setSelectedGift(null);
    } catch (error) {
      console.error(error);
      alert(
        "❌ Buyurtma yuborilmadi.\nServer ishlayotganini tekshiring."
      );
    }

    setSending(false);
  }

  function copyCard() {
    navigator.clipboard.writeText("5614 6821 1064 4707  Sheraliyev.M");
    alert("📋 Karta raqami nusxalandi!");
  }

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        padding: "20px 15px 100px",
        background: "#f5f5f5",
        boxSizing: "border-box",
      },
    },

    React.createElement(
      "h1",
      {
        style: {
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "22px",
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
          margin: "auto",
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
              boxShadow: "0 3px 12px rgba(0,0,0,.08)",
            },
          },

          React.createElement(
            "div",
            {
              style: {
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
              },
            })
          ),

          React.createElement(
            "h2",
            {
              style: {
                fontSize: "18px",
                margin: "12px 2px 7px",
              },
            },
            gift.name
          ),

          React.createElement(
            "div",
            {
              style: {
                color: "#666",
                marginBottom: "10px",
              },
            },
            "⭐ " + gift.stars + " Stars"
          ),

          React.createElement(
            "strong",
            null,
            gift.price
          ),

          React.createElement(
            "button",
            {
              onClick: function () {
                openPayment(gift);
              },
              style: {
                width: "100%",
                marginTop: "10px",
                border: "none",
                borderRadius: "12px",
                padding: "11px",
                background: "#2481cc",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
              },
            },
            "Sotib olish"
          )
        );
      })
    ),

    selectedGift &&
      React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
          },
        },

        React.createElement(
          "div",
          {
            style: {
              width: "100%",
              maxWidth: "400px",
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxSizing: "border-box",
            },
          },

          React.createElement(
            "button",
            {
              onClick: closePayment,
              style: {
                float: "right",
                border: "none",
                background: "#eee",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontSize: "20px",
              },
            },
            "×"
          ),

          React.createElement(
            "h2",
            {
              style: {
                textAlign: "center",
              },
            },
            "💳 To'lov"
          ),

          React.createElement(
            "p",
            {
              style: {
                textAlign: "center",
              },
            },
            selectedGift.name +
              " — " +
              selectedGift.price
          ),

          React.createElement(
            "div",
            {
              style: {
                background: "#f3f4f6",
                borderRadius: "15px",
                padding: "18px",
                textAlign: "center",
                marginTop: "15px",
              },
            },

            React.createElement(
              "div",
              {
                style: {
                  color: "#777",
                  fontSize: "13px",
                },
              },
              "Karta raqami"
            ),

            React.createElement(
              "div",
              {
                style: {
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "8px",
                },
              },
              "KARTA_RAQAMINGIZ"
            ),

            React.createElement(
              "button",
              {
                onClick: copyCard,
                style: {
                  marginTop: "12px",
                  border: "none",
                  borderRadius: "10px",
                  padding: "9px 16px",
                },
              },
              "📋 Nusxalash"
            )
          ),

          React.createElement(
            "p",
            {
              style: {
                textAlign: "center",
                color: "#777",
                fontSize: "13px",
              },
            },
            "To'lovni amalga oshirgach, tugmani bosing."
          ),

          React.createElement(
            "button",
            {
              onClick: paymentDone,
              disabled: sending,
              style: {
                width: "100%",
                border: "none",
                borderRadius: "13px",
                padding: "13px",
                background: "#22a06b",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
              },
            },
            sending ? "Yuborilmoqda..." : "✅ To'lov qildim"
          )
        )
      )
  );
}

export default Gift;
```
