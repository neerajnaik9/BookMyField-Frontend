using System.Security.Cryptography;
using System.Text;
using BookMyFieldBackend.DTOs;

namespace BookMyFieldBackend.Helpers
{
    public static class Utils
    {
        public static void ValidateRazorpaySignature(Dictionary<string, string> attributes, string secret)
        {
            string payload = attributes["razorpay_order_id"] + "|" + attributes["razorpay_payment_id"];
            string actualSignature = attributes["razorpay_signature"];

            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret)))
            {
                byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                string generatedSignature = BitConverter.ToString(hash).Replace("-", "").ToLower();

                if (generatedSignature != actualSignature)
                {
                    throw new System.Exception("Invalid payment signature");
                }
            }
        }

        //we have added git copilot 
        internal static bool VerifyRazorpaySignature(PaymentVerificationRequest request)
        {
            throw new NotImplementedException();
        }


        public static string GenerateRazorpaySignature(string orderId, string paymentId, string secret)
        {
            string payload = $"{orderId}|{paymentId}";

            using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret)))
            {
                byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }

    }
}
