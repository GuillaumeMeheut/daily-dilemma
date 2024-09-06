CREATE OR REPLACE FUNCTION increment_choice_and_add_response(
    choice_id INT,
    user_id INT,
    dilemma_id INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Increment the count field for the choice
    UPDATE choices
    SET count = count + 1
    WHERE id = choice_id;

    -- Insert the user's response into the user_responses table
    INSERT INTO user_responses (user_id, dilemma_id, choice_id, submitted_at)
    VALUES (user_id, dilemma_id, choice_id, NOW());

END;
$$;
