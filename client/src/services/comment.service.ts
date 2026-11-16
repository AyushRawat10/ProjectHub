import api from "./api";

export type Comment = {
    id: string;
    task_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_name: string;
};

type GetCommentResponse = {
    message: string;
    comments: Comment[];
}

type CommentResponse = {
    message: string;
    comment: Comment;
}

export const getTaskComments = async (
    taskId: string
): Promise<Comment[]> => {
    const response = await api.get<GetCommentResponse>(
        `/tasks/${taskId}/comments`
    );

    return response.data.comments;
};

export const createComment = async (
    taskId: string,
    content: string
): Promise<Comment> => {
    const response = await api.post<CommentResponse>(
        `/tasks/${taskId}/comments`,
        { content }
    );

    return response.data.comment;
};

export const updateComment = async (
    taskId: string,
    content: string,
    commentId: string
): Promise<Comment> => {
    const response = await api.patch<CommentResponse>(
        `tasks/${taskId}/comments/${commentId}`,
        { content }
    )

    return response.data.comment;
};

export const deleteComment = async (
    taskId: string,
    commentId: string,
): Promise<Comment> => {
    const response = await api.delete<CommentResponse>(
        `tasks/${taskId}/comments/${commentId}`
    )

    return response.data.comment;
}