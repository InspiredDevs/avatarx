import { useState } from "react";

export default function Home() {
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false);

    const generateAvatar = async () => {
        setLoading(true);
    tnpry {
            const response = await fetch("/api/generate");
            const data = await response.json();
            setAvatar(data.image);
        } catch (error) {
            console.error("Error generating avatar:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">AvatarX - AI Avatar Generator</h1>
            <button
                onClick={generateAvatar}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Avatar"}
            </button>
            {avatar && (
                <img src={avatar} alt="Generated Avatar" className="mt-4 w-48 h-48 rounded-full border-4 border-gray-300 shadow-lg" />
            )}
        </div>
    );
}
