import { createSelector } from '@ngrx/store';
import { AppStateInterface } from './appStateInterface';

export const selectFeature = (state: AppStateInterface) => state.issues;
export const isLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const issuesSelector = createSelector(
  selectFeature,
  (state) => state.issues
);
export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectIssueById = (id: string) =>
  createSelector(selectFeature, (state) =>
    state.issues.find((issue) => issue.id === id)
  );
