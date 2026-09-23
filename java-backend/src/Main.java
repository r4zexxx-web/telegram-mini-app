import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {

    public static void main(String[] args) throws Exception {

        System.out.println("Java backend ishga tushdi!");

        String botToken = System.getenv("BOT_TOKEN");

        if (botToken == null || botToken.isBlank()) {
            System.out.println("BOT_TOKEN topilmadi.");
            return;
        }

        // BUYER_CHAT_ID keyin o'zgartiriladi
        String chatId = System.getenv("BUYER_CHAT_ID");

        if (chatId == null || chatId.isBlank()) {
            System.out.println("BUYER_CHAT_ID topilmadi.");
            return;
        }

        String message =
                "🛍️ YANGI BUYURTMA\n\n" +
                "⭐ Mahsulot: Stars 100\n" +
                "💰 Narx: 24 000 so'm\n" +
                "🔢 Soni: 1\n\n" +
                "📦 Jami: 24 000 so'm";

        String json =
                "{"
                + "\"chat_id\":\"" + chatId + "\","
                + "\"text\":\"" + message.replace("\n", "\\n") + "\""
                + "}";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://api.telegram.org/bot"
                        + botToken
                        + "/sendMessage"
                ))
                .header(
                        "Content-Type",
                        "application/json"
                )
                .POST(
                        HttpRequest.BodyPublishers.ofString(json)
                )
                .build();

        HttpResponse<String> response =
                client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString()
                );

        System.out.println("Telegram javobi:");
        System.out.println(response.body());
    }
}