import { useState, useCallback, useEffect } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
    setIsSupported(available);
    if (!available) {
      setError("Speech recognition is not available on this device.");
    }
  }, []);

  useSpeechRecognitionEvent("result", (event) => {
    if (event.results && event.results.length > 0) {
      const currentTranscript = event.results
        .map((r) => r.transcript)
        .join(" ");
      setTranscript(currentTranscript);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    setError(event.message);
    setIsListening(false);
  });

  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
  });

  const startListening = useCallback(async () => {
    setError(null);
    setTranscript("");

    const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!permission.granted) {
      setError("Microphone and speech recognition permission is required.");
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
    });
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    ExpoSpeechRecognitionModule.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
};
