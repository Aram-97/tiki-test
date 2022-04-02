import React, { memo } from "react";
import { useForm } from "@mantine/form";
import {
    Group,
    Stack,
    Radio,
    Button,
    RadioGroup,
    NumberInput,
} from "@mantine/core";

import {
    LABEL,
    PLACEHOLDER,
    GRID_VERSION,
    DEFAULT_VALUES,
} from "../consts";
import { FIELD, FormDataModel } from "../model";
import StyledSetupForm from "./styles";

interface Props {
    handleSubmit: (values: FormDataModel) => void;
}

const SetupForm: React.FC<Props> = memo(({ handleSubmit }) => {
    const form = useForm<FormDataModel>({
        initialValues: DEFAULT_VALUES,
        validate: {
            [FIELD.SIZE]: (value) =>
                value > 0 ? null : "Grid size must be greater than 0",
        },
    });

    return (
        <StyledSetupForm onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="sm">
                <RadioGroup
                    required
                    size="sm"
                    orientation="vertical"
                    label={LABEL.SELECT_VERSION}
                    {...form.getInputProps(FIELD.VERSION)}
                >
                    {Object.values(GRID_VERSION).map(({ value, label }) => (
                        <Radio key={value} value={value} label={label} />
                    ))}
                </RadioGroup>

                <Group align="flex-start">
                    <NumberInput
                        required
                        autoComplete="off"
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                        label={LABEL.ENTER_GRID_SIZE}
                        placeholder={PLACEHOLDER.SIZE}
                        {...form.getInputProps(FIELD.SIZE)}
                    />

                    <Button type="submit">{LABEL.GENERATE}</Button>
                </Group>
            </Stack>
        </StyledSetupForm>
    );
});

SetupForm.displayName = "SetupForm";
export default SetupForm;
