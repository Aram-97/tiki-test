import React, { memo, useContext, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Group, Stack, Radio, Button, RadioGroup, NumberInput } from "@mantine/core";

import { LABEL, PLACEHOLDER, GRID_VERSION, DEFAULT_VALUES } from "../consts";
import { DnDGridContext } from "../DnDGridProvider/context";
import { ACTION_TYPE } from "../DnDGridProvider/model";
import { DnDGridDispatch } from "../DnDGridProvider";
import { FIELD, FormDataModel } from "../model";
import StyledSetupForm from "./styles";

const SetupForm: React.FC = memo(() => {
    const { isGridWorkerRunning } = useContext(DnDGridContext);
    const dispatch = useContext(DnDGridDispatch);

    const form = useForm<FormDataModel>({
        initialValues: DEFAULT_VALUES,
        validate: {
            [FIELD.SIZE]: (value) => (value > 0 ? null : "Grid size must be greater than 0"),
        },
    });

    const color = GRID_VERSION[form.values.version].color;

    const generateGrid = (values: typeof form.values) => {
        dispatch({ type: ACTION_TYPE.CREATE_GRID, payload: values });
    };

    useEffect(() => {
        dispatch({ type: ACTION_TYPE.CREATE_GRID, payload: DEFAULT_VALUES });
    }, [dispatch]);

    return (
        <StyledSetupForm onSubmit={form.onSubmit(generateGrid)}>
            <Stack spacing="sm">
                <RadioGroup
                    required
                    size="sm"
                    color={color}
                    orientation="vertical"
                    label={LABEL.SELECT_VERSION}
                    {...form.getInputProps(FIELD.VERSION)}
                >
                    {Object.values(GRID_VERSION).map(({ value, label }) => (
                        <Radio key={value} value={value} label={label} color={color} />
                    ))}
                </RadioGroup>

                <Group align="flex-start">
                    <NumberInput
                        required
                        color={color}
                        autoComplete="off"
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                        label={LABEL.ENTER_GRID_SIZE}
                        placeholder={PLACEHOLDER.SIZE}
                        {...form.getInputProps(FIELD.SIZE)}
                        styles={{
                            input: {
                                "&:focus": {
                                    borderColor: color,
                                },
                            },
                        }}
                    />

                    <Button type="submit" color={color} disabled={isGridWorkerRunning}>
                        {LABEL.GENERATE}
                    </Button>
                </Group>
            </Stack>
        </StyledSetupForm>
    );
});

SetupForm.displayName = "SetupForm";
export default SetupForm;
