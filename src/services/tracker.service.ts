import {
  IPomodoroSessionResponse,
  TypePomodoroRoundState,
  TypePomodoroSessionState,
} from "@/types/tracker.types";

import { axiosWithAuth } from "@/api/interceptors";

class TrackerService {
  private BASE_URL = "/user/tracker";

  async getTodaySession() {
    const response = await axiosWithAuth.get<IPomodoroSessionResponse>(
      `${this.BASE_URL}/today`,
    );

    return response;
  }

  async createSession() {
    const response = await axiosWithAuth.post<IPomodoroSessionResponse>(
      this.BASE_URL,
    );

    return response;
  }

  async updateSession(id: string, data: TypePomodoroSessionState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);

    return response;
  }

  async deleteSession(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);

    return response;
  }

  async updateRound(id: string, data: TypePomodoroRoundState) {
    const response = await axiosWithAuth.put(
      `${this.BASE_URL}/round/${id}`,
      data,
    );

    return response;
  }
}

export const trackerService = new TrackerService();
