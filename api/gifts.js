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
  const [loading, setLoading] = useState(false);

  function buyGift(gift) {
    setSelectedGift(gift);
  }

  function closeModal() {
    setSelectedGift(null);
  }

  async function paymentDone() {
    if (!selectedGift) return;

    setLoading(true);

    try {
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

      console.log("Buyurtma:", order);

      // Hozircha backend ulanmagan.
      // Keyin shu joyga Java serverni ulaymiz.

      alert("To‘lov haqidagi ma’lumot yuborildi ✅");

      setSelectedGift(null);
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi ❌");
    } finally {
      setLoading(false);
    }
  }

  return React.createElement(
    "div",
    {
      style: {
        padding: "15px",
        background: "#f5f5f5",
        minHeight: "100vh",
        boxSizing: "border-box",
      },
    },

    React.createElement(
      "h2",
      {
        style: {
          textAlign: "center",
          marginBottom: "20px",
        },
      },
      "🎁 Telegram Gifts"
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        },
      },

      gifts.map((gift, index) =>
        React.createElement(
          "div",
          {
            key: index,
            style: {
              background: "#ffffff",
              borderRadius: "18px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            },
          },

          React.createElement(
            "div",
            {
              style: {
                width: "100%",
                height: "190px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafafa",
                borderRadius: "15px",
                overflow: "hidden",
              },
            },

            React.createElement("img", {
              src: gift.image,
              alt: gift.name,
              style: {
                width: "170px",
                height: "170px",
                objectFit: "contain",
                display: "block",
              },
              onError: (e) => {
                e.currentTarget.style.display = "none";
              },
            })
          ),

          React.createElement(
            "div",
            {
              style: {
                fontSize: "18px",
                fontWeight: "700",
                marginTop: "10px",
              },
            },
            gift.name
          ),

          React.createElement(
            "div",
            {
              style: {
                color: "#777",
                marginTop: "5px",
              },
            },
            `⭐ ${gift.stars} Stars`
          ),

          React.createElement(
            "div",
            {
              style: {
                fontSize: "17px",
                fontWeight: "700",
                marginTop: "5px",
              },
            },
            gift.price
          ),

          React.createElement(
            "button",
            {
              onClick: () => buyGift(gift),
              style: {
                width: "100%",
                marginTop: "10px",
                padding: "11px",
                border: "none",
                borderRadius: "12px",
                background: "#2481cc",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              },
            },
            "Sotib olish"
          )
        )
      )
    ),

    selectedGift &&
      React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: "0",
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: "9999",
          },
        },

        React.createElement(
          "div",
          {
            style: {
              width: "100%",
              maxWidth: "360px",
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              boxSizing: "border-box",
            },
          },

          React.createElement(
            "h3",
            {
              style: {
                textAlign: "center",
                marginTop: "0",
              },
            },
            `🎁 ${selectedGift.name}`
          ),

          React.createElement(
            "p",
            {
              style: {
                textAlign: "center",
                color: "#555",
              },
            },
            `Narxi: ${selectedGift.price}`
          ),

          React.createElement(
            "div",
            {
              style: {
                background: "#f3f3f3",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                marginTop: "15px",
              },
            },

            React.createElement(
              "div",
              {
                style: {
                  fontSize: "13px",
                  color: "#777",
                  marginBottom: "7px",
                },
              },
              "To‘lov uchun karta"
            ),

            React.createElement(
              "div",
              {
                style: {
                  fontSize: "20px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                },
              },
              "KARTA_RAQAMI"
            )
          ),

          React.createElement(
            "button",
            {
              onClick: paymentDone,
              disabled: loading,
              style: {
                width: "100%",
                marginTop: "15px",
                padding: "13px",
                border: "none",
                borderRadius: "12px",
                background: "#20a464",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
              },
            },
            loading ? "Yuborilmoqda..." : "To‘lov qildim"
          ),

          React.createElement(
            "button",
            {
              onClick: closeModal,
              style: {
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                border: "none",
                borderRadius: "12px",
                background: "#eeeeee",
                color: "#333",
                fontSize: "15px",
              },
            },
            "Yopish"
          )
        )
      )
  );
}

export default Gift;