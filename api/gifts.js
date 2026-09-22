import React, { useState } from "react";

const gifts = [
  {
    name: "Ayiqcha",
    stars: 15,
    price: "4 000 so'm",
    image: "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Yurakcha",
    stars: 15,
    price: "4 000 so'm",
    image: "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Sovg'a",
    stars: 25,
    price: "6 500 so'm",
    image: "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
  {
    name: "Atirgul",
    stars: 50,
    price: "12 000 so'm",
    image: "https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png",
  },
];

function Gift() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [loading, setLoading] = useState(false);

  const buyGift = (gift) => {
    setSelectedGift(gift);
  };

  const closeModal = () => {
    if (!loading) {
      setSelectedGift(null);
    }
  };

  const paymentDone = async () => {
    if (!selectedGift || loading) return;

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

      console.log("BUYURTMA:", order);

      /*
        BACKENDNI KEYIN ULAYMIZ.
        Hozircha foydalanuvchiga tasdiq chiqaramiz.
      */

      alert(
        `To‘lov ma'lumoti qabul qilindi ✅\n\n` +
        `🎁 ${selectedGift.name}\n` +
        `⭐ ${selectedGift.stars} Stars\n` +
        `💰 ${selectedGift.price}`
      );

      setSelectedGift(null);
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi ❌");
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "15px",
        boxSizing: "border-box",
      },
    },

    React.createElement(
      "h2",
      {
        style: {
          textAlign: "center",
          margin: "5px 0 20px",
          fontSize: "23px",
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
                height: "180px",
                borderRadius: "15px",
                background: "#fafafa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              },
            },

            React.createElement("img", {
              src: gift.image,
              alt: gift.name,
              style: {
                width: "165px",
                height: "165px",
                objectFit: "contain",
              },
              onError: (e) => {
                e.currentTarget.alt = "Rasm yuklanmadi";
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
                fontSize: "14px",
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
                fontSize: "16px",
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
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
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
            justifyContent: "center",
            alignItems: "center",
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
              background: "#fff",
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
                margin: "0 0 10px",
              },
            },
            `🎁 ${selectedGift.name}`
          ),

          React.createElement(
            "div",
            {
              style: {
                textAlign: "center",
                color: "#555",
                marginBottom: "15px",
              },
            },
            `${selectedGift.price} • ⭐ ${selectedGift.stars} Stars`
          ),

          React.createElement(
            "div",
            {
              style: {
                background: "#f2f2f2",
                borderRadius: "13px",
                padding: "16px",
                textAlign: "center",
              },
            },

            React.createElement(
              "div",
              {
                style: {
                  fontSize: "13px",
                  color: "#777",
                  marginBottom: "8px",
                },
              },
              "To‘lov uchun karta"
            ),

            React.createElement(
              "div",
              {
                style: {
                  fontSize: "19px",
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
                background: loading ? "#999" : "#20a464",
                color: "#fff",
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
              disabled: loading,
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

export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: "Gifts API ishlayapti",
  });
}