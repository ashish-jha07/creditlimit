export interface LoginUser {
    IsSucsess:  boolean;
    Message:    string;
    StatusCode: number;
    Response:   LoginUserResponse[];
}

export interface LoginUserResponse {
    JwtToken:     string;
    FullName:     string;
    Initials: string;
    Role:         string;
    Email:        string;
    ProfileImage: string;
}
