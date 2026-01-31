package main

import (
  "encoding/json"
  "log"
  "net/http"
  "os"
)

type RunMatchRequest struct {
  PolicyHashes []string `json:"policy_hashes"`
  Seed         int64    `json:"seed"`
}

type RunMatchResponse struct {
  Status  string `json:"status"`
  Message string `json:"message"`
}

func main() {
  port := os.Getenv("SIM_PORT")
  if port == "" {
    port = "8081"
  }

  http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte("ok"))
  })

  http.HandleFunc("/run-match", func(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
      w.WriteHeader(http.StatusMethodNotAllowed)
      return
    }

    var req RunMatchRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
      w.WriteHeader(http.StatusBadRequest)
      return
    }

    resp := RunMatchResponse{
      Status:  "not_implemented",
      Message: "Simulation scaffold is running; match execution not implemented.",
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    _ = json.NewEncoder(w).Encode(resp)
  })

  log.Printf("simulation service listening on :%s", port)
  if err := http.ListenAndServe(":"+port, nil); err != nil {
    log.Fatal(err)
  }
}
