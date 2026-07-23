import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { splitTranscribedText } from "../utils/splitTasks";

interface VoiceInputModalProps {
  visible: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  onClose: () => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onTasksReceived: (tasks: string[]) => void;
}

const VoiceInputModal = ({
  visible,
  isListening,
  transcript,
  error,
  isSupported,
  onClose,
  onStartListening,
  onStopListening,
  onTasksReceived,
}: VoiceInputModalProps) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (visible && isListening) {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            onStopListening();
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [visible, isListening]);

  const handleProcess = () => {
    if (transcript.trim()) {
      const tasks = splitTranscribedText(transcript);
      onTasksReceived(tasks);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.handle} />

          <Text style={styles.title}>Voice Input</Text>

          {!isSupported ? (
            <View style={styles.unsupported}>
              <Text style={styles.unsupportedText}>
                Voice input is not supported on this device or platform.
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.micContainer,
                  isListening && styles.micActive,
                ]}
              >
                <Text style={styles.micIcon}>🎤</Text>
              </View>

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              {isListening && (
                <View style={styles.listeningInfo}>
                  <ActivityIndicator size="small" color="#6c63ff" />
                  <Text style={styles.listeningText}>Listening...</Text>
                  {countdown > 0 && (
                    <Text style={styles.countdownText}>
                      Auto-stop in {countdown}s
                    </Text>
                  )}
                </View>
              )}

              {transcript ? (
                <View style={styles.transcriptContainer}>
                  <Text style={styles.transcriptLabel}>Heard:</Text>
                  <Text style={styles.transcriptText}>{transcript}</Text>
                </View>
              ) : null}

              <View style={styles.buttonRow}>
                {!isListening ? (
                  <TouchableOpacity
                    style={styles.listenButton}
                    onPress={onStartListening}
                  >
                    <Text style={styles.listenButtonText}>
                      {transcript ? "Listen Again" : "Start Listening"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.stopButton}
                    onPress={onStopListening}
                  >
                    <Text style={styles.stopButtonText}>Stop</Text>
                  </TouchableOpacity>
                )}

                {transcript ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleProcess}
                  >
                    <Text style={styles.addButtonText}>Add Tasks</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <Text style={styles.hint}>
                Say tasks like: "Buy groceries and call mom"
              </Text>
            </>
          )}

          <TouchableOpacity style={styles.closeLink} onPress={onClose}>
            <Text style={styles.closeLinkText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
    minHeight: 320,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#dddddd",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 24,
  },
  micContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0ff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  micActive: {
    backgroundColor: "#6c63ff",
  },
  micIcon: {
    fontSize: 36,
  },
  listeningInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  listeningText: {
    fontSize: 16,
    color: "#6c63ff",
    fontWeight: "600",
  },
  countdownText: {
    fontSize: 13,
    color: "#999999",
  },
  transcriptContainer: {
    backgroundColor: "#f8f8ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  transcriptLabel: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  transcriptText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 22,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  listenButton: {
    flex: 1,
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  listenButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  stopButton: {
    flex: 1,
    backgroundColor: "#ff4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  stopButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  unsupported: {
    alignItems: "center",
    padding: 20,
  },
  unsupportedText: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  hint: {
    fontSize: 12,
    color: "#aaaaaa",
    textAlign: "center",
  },
  closeLink: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  closeLinkText: {
    fontSize: 14,
    color: "#888888",
  },
});

export default VoiceInputModal;
